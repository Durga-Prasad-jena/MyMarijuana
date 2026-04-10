import { Stack, Typography } from "@mui/material";
//name card
interface NameCardPropType {
  label: string;
  value: string | number;
  isStripe: boolean;
  status: string;
}

export const NameCard: React.FC<Partial<NameCardPropType>> = ({
  label,
  value,
  status,
}) => {
  return (
    <Stack direction="row" mt={0.7} color="gray">
      <Typography
        variant="subtitle2"
        fontSize={15}
        fontWeight={700}
        sx={{ minWidth: "40%" }}
      >
        {label}
      </Typography>

      {/* Value section */}
      <Typography
        sx={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          columnGap: "4px",
          width: "55%",
          color:
            status === "Failed"
              ? "red"
              : status === "connected"
                ? "green"
                : "inherit",
          fontWeight:
            status === "Failed" || status === "connected" ? "bold" : "normal",
        }}
      >
        <span style={{ color: "gray" }}>:</span>
        <span>{value}</span>
      </Typography>
    </Stack>
  );
};
