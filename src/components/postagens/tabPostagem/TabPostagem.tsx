import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import ListaPostagens from "../listaPostagem/ListaPostagem";
import "./TabPostagem.css";
import { Carousel } from "../../carrossel/Carrossel";

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
        <Carousel />
      </TabPanel>
    </TabContext>
  );
}

export default TabPostagens;
