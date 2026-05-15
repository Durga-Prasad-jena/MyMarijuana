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
  TableFooter,
  TablePagination,
  TableSortLabel,
  Tooltip,
  CircularProgress,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
  Button,
  TextField,
  Chip,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/router";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Edit, Refresh, Send } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";

import constants from "@/utils/constants";
import PageContainer from "@/theme-components/container/PageContainer";
import RefreshButton from "@/components/RefreshButton";
import {
  useDeleteDoctorMutation,
  useGetAllDoctorQuery,
  useResendPaymentLinkMutation,
} from "@/store/endpoints/doctor/doctorApi";
import { useDebounce } from "@/components/useDebounse";
import ConfirmModal from "@/components/modal/ConfirmModal";
import notify from "@/utils/toast";
import { ApiErrorResponse } from "@/types/api_response_model";
const Doctor = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [doctorId, setDoctorId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(constants.SIZE);
  const [orderBy, setOrderBy] = useState("");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("desc");
  const [textInput, setTextInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const debouncedKeyword = useDebounce(textInput, 400);

  const [resendPaymentLink, { isLoading: isResendPaymentLoading }] =
    useResendPaymentLinkMutation();

  const [deleteDoctor, { isLoading: isDeleteDoctorLoading }] =
    useDeleteDoctorMutation();

  const { data: doctorsData, isLoading: isDoctorsLoading } =
    useGetAllDoctorQuery({
      page: page + 1,
      limit: rowsPerPage,
      keyword: debouncedKeyword || "",
      ...(selectedStatus !== "All" && { subscriptionPlan: selectedStatus }),
    });

  const router = useRouter();

  const handleFilter = () => {
    setPage(0);
    setRowsPerPage(10);
    setSelectedStatus("");
  };

  /*  ------------pagination page change ----------*/
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /*  ------------table sorting ----------*/
  const handleSort = (column: string) => {
    const isAsc = orderBy === column && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTextInput(e.target.value);
  };

  //select dropdown function
  const handleStatusFilter = (e: SelectChangeEvent<string>) => {
    setSelectedStatus(e.target.value);
  };

  /*  ------------table header ----------*/
  const columns = useMemo(
    () => [
      { id: "srNo", label: "SR No", sortable: false },
      { id: "name", label: "Name", sortable: false },
      { id: "emailAddress", label: "Email Address", sortable: false },
      { id: "phoneNumber", label: "Phone Number", sortable: false },
      { id: "Status", label: "Status", sortable: false },
      {
        id: "subscriptionStatus",
        label: "Subscription",
        sortable: true,
      },
      { id: "actions", label: "Actions" },
    ],
    [],
  );

  const handleDeleteDoctor = async (): Promise<void> => {
    try {
      const res = await deleteDoctor({ doctorId }).unwrap();
      notify(res?.message, "success");
    } catch (error) {
      notify((error as ApiErrorResponse)?.data?.message, "error");
    } finally {
      setIsOpenModal(false);
    }
  };

  // resend link
  const handleResendLinkPress = async (id: string) => {
    try {
      const res = await resendPaymentLink({ id }).unwrap();
      notify(res?.message, "success");
    } catch (error) {
      notify((error as ApiErrorResponse)?.data?.message, "error");
    }
  };

  const totalCount = doctorsData?.pagination?.totalItems;
  console.log("totalCount", totalCount);

  return (
    <PageContainer>
      <Typography fontSize={25} fontWeight={"600"} marginBottom={3}>
        Doctor Listing
      </Typography>
      <TableContainer component={Paper}>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          paddingRight={1}
          paddingLeft={1}
        >
          {/* Filter Selects */}
          <Stack
            flexDirection={{
              xs: "column",
              sm: "row",
            }}
            alignItems="center"
            gap={2}
            width={{ xs: "100%", sm: "auto" }}
          >
            <TextField
              placeholder="Search Doctor here..."
              sx={{ width: 350 }}
              onChange={handleSearch}
              value={textInput}
              InputProps={{
                sx: {
                  height: 35,
                  margin: 2,
                  "& input": {
                    padding: "0 8px",
                    height: "35px",
                  },
                },
              }}
            />
            <Box sx={{ minWidth: { xs: "100%", sm: 120 } }}>
              <FormControl fullWidth size="small">
                <InputLabel id="status-label">Status</InputLabel>

                <Select
                  labelId="status-label"
                  id="status-select"
                  value={selectedStatus}
                  label="Status"
                  onChange={handleStatusFilter}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Super Premium">Super Premium</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                  <MenuItem value="Regular">Regular</MenuItem>
                  <MenuItem value="Free">Free</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <RefreshButton onClick={handleFilter} />
          </Stack>
          <Button
            onClick={() => router.push("/dashboards/doctor/create-doctor")}
          >
            Create Doctor
          </Button>
        </Stack>
        <Table stickyHeader aria-label="sticky table" style={{ marginTop: 10 }}>
          <TableHead>
            <TableRow>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {isDoctorsLoading ? (
              <TableRow>
                <TableCell>
                  <CircularProgress
                    size={constants.CIRCULAR_PROGRESS_SIZE}
                    sx={{ marginLeft: 60, marginTop: 5 }}
                  />
                </TableCell>
              </TableRow>
            ) : doctorsData && doctorsData.data.length > 0 ? (
              doctorsData?.data?.map((doctor, index) => {
                return (
                  <TableRow
                    key={doctor.doctorId}
                    sx={{
                      height: 56,
                      "&:nth-of-type(even)": { backgroundColor: "#fafafa" },
                    }}
                  >
                    <TableCell>
                      <Typography variant="subtitle2">{index + 1}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {doctor?.title}{" "}
                        {`${doctor?.firstName} ${doctor?.lastName}`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={""}>
                        <Typography variant="subtitle2">
                          {doctor?.email}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={""}>
                        <Typography variant="subtitle2">
                          {doctor?.phone}
                        </Typography>
                      </Tooltip>
                    </TableCell>

                    <TableCell>
                      {/* <Tooltip title={""}>
                        <Typography variant="subtitle2">
                          {doctor?.subscription?.planName} 
                        </Typography>
                      </Tooltip> */}
                      <Typography variant="subtitle2">
                        <Chip
                          color={
                            doctor?.status === "Active"
                              ? "success"
                              : doctor?.status === "Pending"
                                ? "secondary"
                                : "warning"
                          }
                          sx={{
                            borderRadius: "6px",
                            fontSize: 10,
                            fontWeight: "600",
                          }}
                          size="small"
                          label={`${doctor?.status}`}
                        />
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {/* <Tooltip title={""}>
                        <Typography variant="subtitle2">
                          {doctor?.subscription?.planName} 
                        </Typography>
                      </Tooltip> */}
                      <Typography variant="subtitle2">
                        <Chip
                          color={
                            doctor?.subscription?.status === "Active"
                              ? "success"
                              : doctor?.subscription?.status === "Pending"
                                ? "error"
                                : "warning"
                          }
                          sx={{
                            borderRadius: "6px",
                            fontSize: 10,
                            fontWeight: "600",
                          }}
                          size="small"
                          label={`${doctor?.subscription?.subscriptionPlan?.name}${" "}(${doctor?.subscription?.status})`}
                        />
                      </Typography>
                    </TableCell>

                    {/* <TableCell>
                      <Typography variant="subtitle2">Silver</Typography>
                    </TableCell> */}

                    <TableCell>
                      <Stack flexDirection={"row"} gap={2}>
                        <Tooltip title="View">
                          <IconButton
                            aria-label="ACTIVE"
                            onClick={() =>
                              router.push(
                                `/dashboards/doctor/detail?doctorId=${doctor.doctorId}`,
                              )
                            }
                          >
                            <RemoveRedEyeIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Profile">
                          <IconButton
                            aria-label="ACTIVE"
                            onClick={() =>
                              router.push(
                                `/dashboards/doctor/update-profile?doctorId=${doctor.doctorId}`,
                              )
                            }
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setIsOpenModal(true);
                              setDoctorId(doctor.doctorId);
                            }}
                          >
                            <DeleteIcon fontSize="small" color="error" />
                          </IconButton>
                        </Tooltip>
                        {doctor?.subscription?.status !== "Active" && (
                          <Tooltip title="Resend Payment Link">
                            <IconButton
                              disabled={isResendPaymentLoading}
                              size="small"
                              onClick={() =>
                                handleResendLinkPress(doctor.doctorId)
                              }
                            >
                              <Send fontSize="small" color="error" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="150px"
                    width="100%"
                  >
                    <Typography color="text.secondary">
                      {constants.NO_DATA_FOUND}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
            {/* //row */}
          </TableBody>
          {/* pagination */}
          {totalCount! > rowsPerPage && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[25, 50, 75, 100]}
                  count={totalCount!}
                  rowsPerPage={rowsPerPage}
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
          handleConfirm={handleDeleteDoctor}
          label={`Are you sure you want to delete this doctor?`}
          isDisableLoading={isDeleteDoctorLoading}
        />
      )}
    </PageContainer>
  );
};

export default Doctor;
