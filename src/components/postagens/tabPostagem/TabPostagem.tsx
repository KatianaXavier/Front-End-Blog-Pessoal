import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import ListaPostagens from "../listaPostagem/ListaPostagem";
import "./TabPostagens.css";

function TabPostagens() {
  const [value, setValue] = React.useState("1");
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
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus
        similique nulla neque deserunt sed repudiandae ea accusantium, dicta
        nihil nisi nostrum ratione quod incidunt aspernatur delectus temporibus,
        sit, expedita recusandae. Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Necessitatibus similique nulla neque deserunt sed
        repudiandae ea accusantium, dicta nihil nisi nostrum ratione quod
        incidunt aspernatur delectus temporibus, sit, expedita recusandae. Lorem
        ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus
        similique nulla neque deserunt sed repudiandae ea accusantium, dicta
        nihil nisi nostrum ratione quod incidunt aspernatur delectus temporibus,
        sit, expedita recusandae.
      </TabPanel>
    </TabContext>
  );
}

export default TabPostagens;
