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
import {
  useAllFaqQuery,
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useDetailFaqQuery,
  useUpdateFaqMutation,
} from "@/store/endpoints/app/faq/faqApi";
import { CreateFaqPayloadModel } from "@/types/apps/faq";
import AddEditFaqModal from "@/components/modal/AddEditFaqModal";

const Faq = () => {
  //-----------state-----------
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [faqId, setFaqId] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("desc");
  const [isAddEditModal, setIsAddEditModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const { data: faqDetailData } = useDetailFaqQuery(
    { id: faqId },
    { skip: !isUpdating },
  );
  const [deleteFaq, { isLoading: isDeleteFaqLoading }] = useDeleteFaqMutation();

  const [createFaq, { isLoading: isCreateFaqLoading }] = useCreateFaqMutation();

  const { data: faqData, isLoading } = useAllFaqQuery({
    page: page + 1,
    limit,
  });

  const [updateFaq, { isLoading: isUpdateFaqLoading }] = useUpdateFaqMutation();

  //effect function
  useEffect(() => {
    if (faqDetailData) {
      setEditMode(true);
      setQuestion(faqDetailData?.data?.question);
      setAnswer(faqDetailData?.data?.answer);
    } else {
      setEditMode(false);
      setQuestion("");
      setAnswer("");
    }
  }, [faqDetailData]);

  //----------handlers -----------

  const handleDeleteFaq = async (): Promise<void> => {
    try {
      const result = await deleteFaq({ id: faqId }).unwrap();
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

  const handlePressFaq = async (
    question: string,
    answer: string,
  ): Promise<void> => {
    try {
      const payload: CreateFaqPayloadModel = {
        answer: answer,
        question: question,
      };
      if (editMode) {
        const result = await updateFaq({
          body: payload,

          id: faqId,
        }).unwrap();
        notify(result?.message, "success");
        return;
      }
      const result = await createFaq({
        question,
        answer,
      }).unwrap();
      notify(result?.message, "success");
    } catch (error) {
      notify((error as ApiErrorResponse)?.data?.message, "error");
    } finally {
      setIsAddEditModal(false);
      setFaqId("");
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

  const totalCount = faqData?.pagination?.total;

  const totalPages = faqData?.pagination?.totalPages || 0;

  return (
    <PageContainer>
      <Typography fontSize={25} fontWeight={"600"} marginBottom={3}>
        Faq Management{" "}
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
            Faq Listing
          </Typography>
          <Button
            onClick={() => {
              setIsAddEditModal(true);
              setQuestion("");
              setAnswer("");
            }}
          >
            Add Faq
          </Button>
        </Stack>
        <Table stickyHeader sx={{ tableLayout: "fixed" }}>
          {/* HEADER */}
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f9fafb" }}>
              <TableCell sx={{ width: "120px", fontWeight: 600, fontSize: 16 }}>
                <TableSortLabel
                  active={orderBy === "SrNo"}
                  direction={orderBy === "SrNo" ? orderDirection : "asc"}
                  onClick={() => handleSort("SrNo")}
                >
                  Sr No
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ width: "40%", fontWeight: 600, fontSize: 16 }}>
                Question
              </TableCell>
              <TableCell sx={{ width: "60%", fontWeight: 600, fontSize: 16 }}>
                Answer
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
            ) : faqData && faqData?.data?.length > 0 ? (
              faqData.data.map((item, index) => (
                <TableRow
                  key={item.faqId}
                  hover
                  sx={{
                    height: 56,
                    "&:nth-of-type(even)": { backgroundColor: "#fafafa" },
                  }}
                >
                  {/* SR NO */}
                  <TableCell>
                    <Typography fontWeight={500}>{index + 1}</Typography>
                  </TableCell>

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
                      {capitalize(item?.question)}
                    </Typography>
                  </TableCell>

                  {/* Question */}
                  <TableCell>
                    <Tooltip title={item?.answer}>
                      <Typography
                        fontWeight={500}
                        noWrap
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {capitalize(item?.answer)}
                      </Typography>
                    </Tooltip>
                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setIsUpdating(true);
                            setFaqId(item.faqId);
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
                            setFaqId(item.faqId);
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
                    // borderTop: "1px solid #e0e0e0",
                    // backgroundColor: "#fafafa",
                  }}
                >
                  {/* LEFT SIDE */}
                  <Typography variant="body2" color="text.secondary">
                    {/* Total: {totalCount || 0} items */}
                  </Typography>

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
          handleConfirm={handleDeleteFaq}
          label={`Are you sure you want to delete this Faq?`}
          isDisableLoading={isDeleteFaqLoading}
        />
      )}

      {isAddEditModal && (
        <AddEditFaqModal
          open={isAddEditModal}
          handleClose={() => {
            setIsAddEditModal(false);
            setEditMode(false);
            setQuestion("");
            setAnswer("");
          }}
          handleSubmitFaq={handlePressFaq}
          title={editMode ? "Edit FAQ" : "Add FAQ"}
          isDisableLoading={isCreateFaqLoading || isUpdateFaqLoading}
          confirmBtnText={
            editMode
              ? isUpdateFaqLoading
                ? "Updating..."
                : "Update"
              : isCreateFaqLoading
                ? "Adding..."
                : "Add"
          }
          question={question}
          setQuestion={setQuestion}
          answer={answer}
          setAnswer={setAnswer}
        />
      )}
    </PageContainer>
  );
};

export default Faq;
