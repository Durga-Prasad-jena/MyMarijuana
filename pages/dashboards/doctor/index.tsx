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

import constants from "@/utils/constants";
import PageContainer from "@/theme-components/container/PageContainer";
import RefreshButton from "@/components/RefreshButton";
import { TextFields } from "@mui/icons-material";
import { useGetAllDoctorQuery } from "@/store/endpoints/doctor/doctorApi";
const Doctor = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(constants.SIZE);
  const [orderBy, setOrderBy] = useState("");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("desc");

  const { data: doctorsData, isLoading: isDoctorsLoading } =
    useGetAllDoctorQuery({
      page: page + 1,
      limit: rowsPerPage,
    });

  const router = useRouter();

  /*  ------------set query args ----------*/
  // const queryArgs: CommissionTransactionsQueryParams = {
  //   page: page + 1,
  //   size: rowsPerPage,
  // };

  // if (customRange.start) {
  //   queryArgs.startDate = customRange.start.format("YYYY-MM-DD");
  // }
  // if (customRange.end) {
  //   queryArgs.endDate = customRange.end.format("YYYY-MM-DD");
  // }

  /*  ------------api call ----------*/
  // const { data: transactionCommissions, isLoading: isOrderLoading } =
  //   useCommissionTransactionsQuery(queryArgs);

  // useEffect(() => {
  //   if (selectedDate === "custom") {
  //     setCustomRange({
  //       start: startDate ? dayjs(startDate) : null,
  //       end: endDate ? dayjs(endDate) : null,
  //     });
  //   }
  // }, [startDate, endDate, selectedDate]);

  const handleFilter = () => {
    setPage(0);
    setRowsPerPage(10);
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

  /*  ------------table header ----------*/
  const columns = useMemo(
    () => [
      { id: "srNo", label: "SR No", sortable: false },
      { id: "name", label: "Name", sortable: false },
      { id: "emailAddress", label: "Email Address", sortable: false },
      { id: "phoneNumber", label: "Phone Number", sortable: false },
      { id: "Subscriptions", label: "Subscriptions Plan", sortable: false },
      { id: "actions", label: "Actions" },
    ],
    [],
  );

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
              // onChange={handleSearch}
              // value={textInput}
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
            ) : (
              doctorsData &&
              doctorsData.data.length > 0 &&
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
                            doctor?.subscription?.planName === "Premium"
                              ? "success"
                              : doctor?.subscription?.planName ===
                                  "Super Premium"
                                ? "primary"
                                : doctor?.subscription?.planName === "Regular"
                                  ? "secondary"
                                  : doctor?.subscription?.planName === "Free"
                                    ? "info"
                                    : "warning"
                          }
                          sx={{
                            borderRadius: "6px",
                            fontSize: 10,
                            fontWeight: "600",
                          }}
                          size="small"
                          label={doctor?.subscription?.planName}
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
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
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
    </PageContainer>
  );
};

export default Doctor;
