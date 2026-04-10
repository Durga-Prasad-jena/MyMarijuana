import BlankCard from "@/components/BlankCard";
import {
  Box,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import constants from "@/utils/constants";
import { useContactDetailQuery } from "@/store/endpoints/app/contact/contactApi";
import { NameCard } from "../NameCard";
import { capitalize } from "@/utils/capitalize";

interface ContactDetailCardTypes {
  contactRequestId: string;
}

const ContactDetailCard: React.FC<ContactDetailCardTypes> = ({
  contactRequestId,
}) => {
  const {
    data: contactDetailData,
    isLoading,
    isSuccess,
  } = useContactDetailQuery(
    { id: contactRequestId },
    { skip: !contactRequestId },
  );

  const contactDetail = contactDetailData?.data;

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "30vh",
            width: "100%",
          }}
        >
          <CircularProgress size={constants.CIRCULAR_PROGRESS_SIZE} />
        </Box>
      ) : contactDetail && isSuccess ? (
        <Grid container spacing={3} padding={2}>
          {/* Contact Information */}
          <Grid item xs={12}>
            <BlankCard>
              <CardContent>
                <Typography variant="h5" mb={2}>
                  Contact Information
                </Typography>

                <Stack spacing={1}>
                  <NameCard
                    label="Name"
                    value={capitalize(
                      `${contactDetail?.firstName} ${contactDetail?.lastName}`,
                    )}
                  />
                  <NameCard label="Email" value={contactDetail?.email} />
                  <NameCard label="Subject" value={contactDetail?.subject} />
                  <NameCard label="Subject" value={contactDetail?.subject} />
                  <NameCard label="Message" value={contactDetail.message} />
                </Stack>
              </CardContent>
            </BlankCard>
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "30vh",
            width: "100%",
          }}
        ></Box>
      )}
    </>
  );
};

export default ContactDetailCard;
