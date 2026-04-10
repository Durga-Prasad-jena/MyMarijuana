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
import { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";

import constants from "@/utils/constants";
import notify from "@/utils/toast";

import { capitalize } from "@/utils/capitalize";
import PageContainer from "@/theme-components/container/PageContainer";

import ConfirmModal from "@/components/modal/ConfirmModal";
import { ApiErrorResponse } from "@/types/api_response_model";
import {
  useDeleteContactMutation,
  useGetAllContactQuery,
} from "@/store/endpoints/app/contact/contactApi";
import { useRouter } from "next/navigation";

const Contact = () => {
  //-----------state-----------
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inquiryId, setInquiryId] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [orderBy, setOrderBy] = useState("");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("desc");

  const router = useRouter();

  const [deleteContact, { isLoading: isDeleteContactLoading }] =
    useDeleteContactMutation();

  const { data: contactData, isLoading } = useGetAllContactQuery({
    page: page + 1,
    limit,
    keyword: "",
  });

  //----------handlers -----------

  const handleDeleteContact = async (): Promise<void> => {
    try {
      const result = await deleteContact({ id: inquiryId }).unwrap();
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

  const totalCount = contactData?.pagination?.totalItems;

  // const totalPages = contactData?.pagination?.totalPages || 0;

  return (
    <PageContainer>
      <Typography fontSize={25} fontWeight={"600"} marginBottom={3}>
        Contact Management{" "}
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
            Contact Listing
          </Typography>
        </Stack>
        <Table stickyHeader sx={{ tableLayout: "fixed" }}>
          {/* HEADER */}
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f9fafb" }}>
              <TableCell sx={{ width: "200px", fontWeight: 600, fontSize: 16 }}>
                <TableSortLabel
                  active={orderBy === "SrNo"}
                  direction={orderBy === "SrNo" ? orderDirection : "asc"}
                  onClick={() => handleSort("SrNo")}
                >
                  Name
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ width: "60%", fontWeight: 600, fontSize: 16 }}>
                Email
              </TableCell>
              <TableCell sx={{ width: "40%", fontWeight: 600, fontSize: 16 }}>
                Phone
              </TableCell>
              <TableCell sx={{ width: "60%", fontWeight: 600, fontSize: 16 }}>
                Subject
              </TableCell>

              <TableCell
                align="center"
                sx={{ width: "160px", fontWeight: 600, fontSize: 16 }}
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
            ) : contactData && contactData?.data?.length > 0 ? (
              contactData.data.map((item) => (
                <TableRow
                  key={item.inquiryId}
                  hover
                  sx={{
                    height: 56,
                    "&:nth-of-type(even)": { backgroundColor: "#fafafa" },
                  }}
                >
                  {/* SR NO */}

                  {/* Question */}
                  <TableCell>
                    <Typography
                      fontWeight={500}
                      noWrap
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {capitalize(`${item?.firstName} ${item?.lastName}`)}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      fontWeight={500}
                      noWrap
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item?.email}
                    </Typography>
                  </TableCell>

                  {/* Question */}
                  <TableCell>
                    <Tooltip title={item?.email}>
                      <Typography
                        fontWeight={500}
                        noWrap
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {capitalize(item?.phoneNumber)}
                      </Typography>
                    </Tooltip>
                  </TableCell>

                  <TableCell>
                    <Tooltip title={item?.email}>
                      <Typography
                        fontWeight={500}
                        noWrap
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {capitalize(item?.subject)}
                      </Typography>
                    </Tooltip>
                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="View">
                        <IconButton
                          size="small"
                          onClick={() => {
                            router.push(
                              `/dashboards/contact/detail?inquiryId=${item?.inquiryId}`,
                            );
                            // setInquiryId(item.inquiryId);
                          }}
                        >
                          <RemoveRedEyeIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setIsOpenModal(true);
                            setInquiryId(item.inquiryId);
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
          handleConfirm={handleDeleteContact}
          label={`Are you sure you want to delete this contact?`}
          isDisableLoading={isDeleteContactLoading}
        />
      )}
    </PageContainer>
  );
};

export default Contact;
