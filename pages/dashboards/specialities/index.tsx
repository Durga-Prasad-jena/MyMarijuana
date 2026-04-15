import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Typography,
  IconButton,
  Button,
  Tooltip,
  Box,
  CircularProgress,
  TableSortLabel,
  TableFooter,
  TablePagination,
} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useEffect, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import constants from "@/utils/constants";
import notify from "@/utils/toast";

import { capitalize } from "@/utils/capitalize";
import PageContainer from "@/theme-components/container/PageContainer";

import ConfirmModal from "@/components/modal/ConfirmModal";
import { ApiErrorResponse } from "@/types/api_response_model";
import AddEditModal from "@/components/modal/AddEditModal";
import {
  useCreateSpecialtiesMutation,
  useDeleteSpecialtiesMutation,
  useDetailSpecialtiesQuery,
  useSpecialtiesQuery,
  useUpdateSpecialtiesMutation,
} from "@/store/endpoints/app/specialities/specialitiesApi";

const Specialties = () => {
  //-----------state-----------
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [specialtyId, setSpecialtyId] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("desc");
  const [isAddEditModal, setIsAddEditModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { data: specialtiesDetailsData } = useDetailSpecialtiesQuery(
    { id: specialtyId },
    { skip: !isUpdating },
  );
  console.log("specialtiesDetailsData", specialtiesDetailsData);
  const [deleteSpecialties, { isLoading: isDeleteSpecialtyLoading }] =
    useDeleteSpecialtiesMutation();

  const [createSpecialties, { isLoading: isCreateSpecialtiesLoading }] =
    useCreateSpecialtiesMutation();

  const { data: specialtiesData, isLoading } = useSpecialtiesQuery({
    page: page + 1,
    limit,
  });

  const [updateSpecialties, { isLoading: isUpdateSpecialtyLoading }] =
    useUpdateSpecialtiesMutation();

  //effect function
  useEffect(() => {
    if (specialtiesDetailsData) {
      setEditMode(true);
      setInputValue(specialtiesDetailsData?.data?.name || "");
    } else {
      setEditMode(false);
      setInputValue("");
    }
  }, [specialtiesDetailsData]);

  //----------handlers -----------

  const handleDeleteSpecialty = async (): Promise<void> => {
    try {
      const result = await deleteSpecialties({ id: specialtyId }).unwrap();
      notify(result?.message, "success");
    } catch (error) {
      notify((error as ApiErrorResponse)?.data?.message, "error");
    } finally {
      setIsOpenModal(false);
    }
  };

  const handleSort = (column: string) => {
    const isAsc = orderBy === column && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const handlePressSpecialties = async (inputText: string): Promise<void> => {
    try {
      if (editMode) {
        const result = await updateSpecialties({
          name: inputText,
          id: specialtyId,
        }).unwrap();
        notify(result?.message, "success");
        return;
      }
      const result = await createSpecialties({ name: inputText }).unwrap();
      notify(result?.message, "success");
    } catch (error) {
      notify((error as ApiErrorResponse)?.data?.message, "error");
    } finally {
      setIsAddEditModal(false);
      setSpecialtyId("");
      setInputValue("");
      setEditMode(false);
    }
  };

  /*  ------------pagination page change ----------*/
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const totalCount = specialtiesData?.pagination?.total;
  const totalPages = specialtiesData?.pagination?.totalPages || 0;

  return (
    <PageContainer>
      <Typography fontSize={25} fontWeight={"600"} marginBottom={3}>
        Specialties Management{" "}
      </Typography>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          paddingLeft={3}
          paddingRight={3}
          marginBottom={2}
          marginTop={3}
        >
          <Typography fontSize={20} fontWeight={"600"}>
            Specialties Listing
          </Typography>
          <Button
            onClick={() => {
              setIsAddEditModal(true);
              setInputValue("");
            }}
          >
            Add Specialties
          </Button>
        </Stack>
        <Table stickyHeader sx={{ tableLayout: "fixed" }}>
          {/*  HEADER */}
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f9fafb" }}>
              <TableCell sx={{ width: "80px", fontWeight: 600 }}>
                <TableSortLabel
                  active={orderBy === "SrNo"}
                  direction={orderBy === "SrNo" ? orderDirection : "asc"}
                  onClick={() => handleSort("SrNo")}
                >
                  Sr No
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ width: "60%", fontWeight: 600 }}>Name</TableCell>

              <TableCell
                align="center"
                sx={{ width: "160px", fontWeight: 600 }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          {/* BODY */}
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <CircularProgress size={30} />
                </TableCell>
              </TableRow>
            ) : specialtiesData && specialtiesData?.data?.length > 0 ? (
              specialtiesData.data.map((item, index) => (
                <TableRow
                  key={item.id}
                  hover
                  sx={{
                    height: 56,
                    "&:nth-of-type(even)": { backgroundColor: "#fafafa" },
                  }}
                >
                  {/* Sr No */}
                  <TableCell>
                    <Typography fontWeight={500}>
                      {page * limit + index + 1}
                    </Typography>
                  </TableCell>

                  {/* Name */}
                  <TableCell>
                    <Typography
                      fontWeight={500}
                      noWrap
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {capitalize(item?.name)}
                    </Typography>
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setIsUpdating(true);
                            setSpecialtyId(item.id);
                            setIsAddEditModal(true);
                          }}
                        >
                          <ModeEditOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setIsOpenModal(true);
                            setSpecialtyId(item.id);
                          }}
                        >
                          <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography color="text.secondary">
                    {constants.NO_DATA_FOUND}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} sx={{ p: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                    py: 1.5,
                    borderTop: "1px solid #e0e0e0",
                    backgroundColor: "#fafafa",
                  }}
                >
                  {/* LEFT SIDE */}
                  {totalCount! > 0 && (
                    <Typography variant="body2" color="text.secondary">
                      Total: {totalCount || 0} items
                    </Typography>
                  )}

                  {/* RIGHT SIDE */}
                  {totalPages > 1 && (
                    <TablePagination
                      component="div"
                      rowsPerPageOptions={[10, 25, 50, 100]}
                      count={totalCount || 0}
                      rowsPerPage={limit}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      sx={{
                        "& .MuiTablePagination-toolbar": {
                          minHeight: "40px",
                          padding: 0,
                        },
                        "& .MuiTablePagination-selectLabel": {
                          fontSize: "0.85rem",
                        },
                        "& .MuiTablePagination-displayedRows": {
                          fontSize: "0.85rem",
                        },
                      }}
                    />
                  )}
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {isOpenModal && (
        <ConfirmModal
          open={isOpenModal}
          handleClose={() => setIsOpenModal(false)}
          handleConfirm={handleDeleteSpecialty}
          label={`Are you sure you want to delete this specialties?`}
          isDisableLoading={isDeleteSpecialtyLoading}
        />
      )}

      {isAddEditModal && (
        <AddEditModal
          open={isAddEditModal}
          handleClose={() => {
            setIsAddEditModal(false);
            setEditMode(false);
          }}
          handleAddEditName={handlePressSpecialties}
          label={"Specialties"}
          isDisableLoading={
            isCreateSpecialtiesLoading || isUpdateSpecialtyLoading
          }
          confirmBtnText={
            editMode
              ? `${isUpdateSpecialtyLoading ? "Updating..." : "Update"}`
              : `${isCreateSpecialtiesLoading ? "Adding" : "Add"}`
          }
          value={inputValue}
          setValue={setInputValue}
        />
      )}
    </PageContainer>
  );
};

export default Specialties;
