import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import ListaPostagens from "../listaPostagem/ListaPostagem";
import "./TabPostagem.css";
import { Typography } from "@mui/material";

function TabPostagens() {
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <AppBar position="static">
        <TabList
          className="tabOpcoes"
          centered
          indicatorColor="primary"
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab className="textosTabOpcoes" label="Postagens" value="1" />
          <Tab className="textosTabOpcoes" label="Sobre" value="2" />
        </TabList>
      </AppBar>
      <TabPanel value="1">
        <ListaPostagens />
      </TabPanel>
      <TabPanel value="2">
        <Typography variant="h6" component="h1" align="center">
          Este é um projeto cujo back-end foi desenvolvido em Java com SpringBoot, incluindo banco de dados relacional. 
          <br />
          O front-end foi desenvolvido em React com Typescript e Material UI. 
          <br />
          Todo o projeto foi realizado durante o bootcamp FullStack Java, da Generation Brasil. 🧡
        </Typography>
      </TabPanel>
    </TabContext>
  );
}

export default TabPostagens;
