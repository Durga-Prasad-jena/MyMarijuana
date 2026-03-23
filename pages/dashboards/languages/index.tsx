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
  useCreateLanguagesMutation,
  useDeleteLanguagesMutation,
  useDetailsLanguagesQuery,
  useLanguagesDataQuery,
  useUpdateLanguagesMutation,
} from "@/store/endpoints/app/languages/languageApi";

const Languages = () => {
  //-----------state-----------
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [languageId, setLanguageId] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("desc");
  const [isAddEditModal, setIsAddEditModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { data: languageDetailData } = useDetailsLanguagesQuery(
    { id: languageId },
    { skip: !isUpdating },
  );
  console.log("languageDetailData", languageDetailData);
  const [deleteSpecialties, { isLoading: isDeleteLanguageLoading }] =
    useDeleteLanguagesMutation();

  const [createLanguages, { isLoading: isCreateLanguagesLoading }] =
    useCreateLanguagesMutation();

  const { data: languagesData, isLoading } = useLanguagesDataQuery({
    page,
    limit,
  });

  const [updateLanguages, { isLoading: isUpdateLanguageLoading }] =
    useUpdateLanguagesMutation();

  //effect function
  useEffect(() => {
    if (languageDetailData) {
      setEditMode(true);
      setInputValue(languageDetailData?.data?.name || "");
    } else {
      setEditMode(false);
      setInputValue("");
    }
  }, [languageDetailData]);

  //----------handlers -----------

  const handleDeleteLanguage = async (): Promise<void> => {
    try {
      const result = await deleteSpecialties({ id: languageId }).unwrap();
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

  const handlePressLanguages = async (inputText: string): Promise<void> => {
    try {
      if (editMode) {
        const result = await updateLanguages({
          name: inputText,
          id: languageId,
        }).unwrap();
        notify(result?.message, "success");
        return;
      }
      const result = await createLanguages({ name: inputText }).unwrap();
      notify(result?.message, "success");
    } catch (error) {
      notify((error as ApiErrorResponse)?.data?.message, "error");
    } finally {
      setIsAddEditModal(false);
      setLanguageId("");
      setInputValue("");
      setEditMode(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = useMemo(
    () => [
      { id: "SrNo", label: "Sr No", sortable: true },
      { id: "name", label: "Name" },
      { id: "actions", label: "Actions" },
    ],
    [],
  );

  const totalCount = languagesData?.pagination?.total;

  return (
    <PageContainer>
      <Typography fontSize={25} fontWeight={"600"} marginBottom={3}>
        Languages Management{" "}
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
            Languages Listing
          </Typography>
          <Button
            onClick={() => {
              setIsAddEditModal(true);
              setInputValue("");
            }}
          >
            Add Languages
          </Button>
        </Stack>
        <Table stickyHeader aria-label="sticky table">
          {/* table header */}
          <TableHead>
            {columns.map(({ id, label, sortable }) => (
              <TableCell key={id}>
                <Typography variant="h6">
                  {sortable ? (
                    <TableSortLabel
                      active={orderBy === id}
                      direction={orderBy === id ? orderDirection : "asc"}
                      onClick={() => handleSort(id)}
                    >
                      {label}
                    </TableSortLabel>
                  ) : (
                    label
                  )}
                </Typography>
              </TableCell>
            ))}
          </TableHead>

          {/* // table body */}
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell>
                  <CircularProgress
                    size={constants.CIRCULAR_PROGRESS_SIZE}
                    sx={{ marginLeft: 60, marginTop: 5 }}
                  />
                </TableCell>
              </TableRow>
            ) : languagesData && languagesData?.data?.length > 0 ? (
              languagesData?.data?.map((item, index) => {
                return (
                  <TableRow
                    key={item.languageId}
                    // hover
                    // sx={{ "&:last-child td": { borderBottom: 0 } }}
                  >
                    <TableCell>
                      <Typography fontWeight={500}>{index + 1}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography fontWeight={500}>
                        {capitalize(item?.name)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Stack
                        direction="row"
                        spacing={1}
                        // justifyContent="center"
                      >
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() => {
                              // console.log("hello");
                              setIsUpdating(true);
                              setLanguageId(item?.languageId);
                              setIsAddEditModal(true);
                            }}
                          >
                            <ModeEditOutlineIcon
                              color="primary"
                              fontSize="small"
                            />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => {
                              setIsOpenModal(true);
                              setLanguageId(item?.languageId);
                            }}
                          >
                            <DeleteIcon color="error" fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={3}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "30vh",
                      width: "100%",
                    }}
                  >
                    <Typography variant="h6" color="textSecondary">
                      {constants.NO_DATA_FOUND}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {totalCount! > limit && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[25, 50, 75, 100]}
                  count={totalCount!}
                  rowsPerPage={limit}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    "& .MuiTablePagination-toolbar": {
                      fontSize: "0.9rem",
                    },
                    "& .MuiTablePagination-selectLabel": {
                      fontWeight: "bold",
                    },
                    "& .MuiTablePagination-displayedRows": {
                      color: "#1976d2",
                    },
                  }}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>

      {isOpenModal && (
        <ConfirmModal
          open={isOpenModal}
          handleClose={() => setIsOpenModal(false)}
          handleConfirm={handleDeleteLanguage}
          label={`Are you sure you want to delete this languages?`}
          isDisableLoading={isDeleteLanguageLoading}
        />
      )}

      {isAddEditModal && (
        <AddEditModal
          open={isAddEditModal}
          handleClose={() => {
            setIsAddEditModal(false);
            setEditMode(false);
          }}
          handleAddEditName={handlePressLanguages}
          label={"Languages"}
          isDisableLoading={isCreateLanguagesLoading || isUpdateLanguageLoading}
          confirmBtnText={
            editMode
              ? `${isUpdateLanguageLoading ? "Updating..." : "Update"}`
              : `${isCreateLanguagesLoading ? "Adding" : "Add"}`
          }
          value={inputValue}
          setValue={setInputValue}
        />
      )}
    </PageContainer>
  );
};

export default Languages;
