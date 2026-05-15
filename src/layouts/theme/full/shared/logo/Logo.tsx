import { useSelector } from "../../../../../store/Store";
import Link from "next/link";
import { styled } from "@mui/material";
import { AppState } from "../../../../../store/Store";
import Image from "next/image";

const Logo = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? "30px" : "160px",
    overflow: "hidden",
    display: "block",
  }));

  if (customizer.activeDir === "ltr") {
    return (
      <LinkStyled href="/">
        {customizer.activeMode === "dark" ? (
          <Image
            src="/images/logos/logo.png"
            alt="logo"
            height={customizer.TopbarHeight}
            width={90} // reduced image width
            priority
            style={{
              objectFit: "contain",
              marginTop: "2px",
              marginLeft: "40px"
            }}
          />
        ) : (
          <Image
            src={"/images/logos/logo.png"}
            alt="logo"
            height={customizer.TopbarHeight}
            width={90} // reduced image width
            priority
            style={{
              objectFit: "contain",
              marginTop: "2px",
              marginLeft: "40px"
            }}
          />
        )}
      </LinkStyled>
    );
  }

  return (
    <LinkStyled href="/">
      {customizer.activeMode === "dark" ? (
        <Image
          src="/images/logos/logo.png"
          alt="logo"
          height={customizer.TopbarHeight}
          width={120}
          priority
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            marginTop: "5px",
          }}
        />
      ) : (
        <Image
          src="/images/logos/logo.png"
          alt="logo"
          height={customizer.TopbarHeight}
          width={120}
          priority
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            marginTop: "5px",
          }}
        />
      )}
    </LinkStyled>
  );
};

export default Logo;
