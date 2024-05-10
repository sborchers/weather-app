import styled from "styled-components";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const Header: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 666);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 666);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <HeaderContainer>
      <Title>weather.io</Title>
      {isSmallScreen ? (
        <>
          <IconButton onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Help</MenuItem>
            <MenuItem onClick={handleClose}>Sign Out</MenuItem>
          </Menu>
        </>
      ) : (
        <ButtonContainer>
          <Button style={{ textTransform: "none" }}>Help</Button>
          <Button style={{ textTransform: "none" }}>Sign Out</Button>
        </ButtonContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  height: 50px;
  padding-bottom: 24px;
  top: 0px;
  width: calc(100% - 48px);
  background-color: white;
  z-index: 1;
`;

const ButtonContainer = styled.div``;

const Title = styled.span`
  text-transform: uppercase;
`;
