import React from "react";
import { SubscriptionFooter } from "../../../Components/footer/SubscriptionFooter";
import Navbar from "../../../Components/Navbar/Navbar";
import { CartPart } from "../cartPart/CartPart";
import { FilterPart } from "../filterPart/FilterPart";
import style from "./SubscriptionPage.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
export const SubscriptionPage = () => {
  let { location } = useParams();

  const [data, SetData] = React.useState(null);
  const getUrl = `http://localhost:1234/subscription/${location}`;

  const getData = (url) => {
    return axios
      .get(url)
      .then((res) => SetData(res.data))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getData(getUrl);
  }, []);

  const [price, setPrice] = React.useState({
    price: "",
    name: "0",
  });

  const handleChangePrice = (event) => {
    const name = event.target.name;
    setPrice({
      ...price,
      [name]: event.target.value,
    });
  };

  React.useEffect(() => {
    console.log(price);
    if (price.price === "") {
      getData(getUrl);
    }
    if (price.price === "10000") {
      console.log("yes");
      return getData(`http://localhost:1234/price/btw10-15/${location}`);
    }
    if (price.price === "15000") {
      return getData(`http://localhost:1234/price/btw15-20/${location}`);
    }
    if (price.price === "20000") {
      return getData(`http://localhost:1234/price/btw20-25/${location}`);
    }
    if (price.price === "25000") {
      return getData(`http://localhost:1234/price/btw25-30/${location}`);
    }
  }, [price.price]);

  const [segment, setSegment] = React.useState({
    HatchBack: false,
    Sedan: false,
    Suv: false,
  });
  const handleChangeSegment = (event) => {
    setSegment({ ...segment, [event.target.name]: event.target.checked });
  };

  React.useEffect(() => {
    if (
      segment.HatchBack === false &&
      segment.Sedan === false &&
      segment.Suv === false
    ) {
      getData(getUrl);
    }

    if (
      segment.HatchBack === true &&
      segment.Sedan === true &&
      segment.Suv === true
    ) {
      getData(getUrl);
    }
    if (segment.HatchBack === true && segment.Sedan === true) {
      getData(`http://localhost:1234/hatch&sedan/${location}`);
    }
    if (segment.HatchBack === true && segment.Suv === true) {
      getData(`http://localhost:1234/hatch&suv/${location}`);
    }
    if (segment.Sedan === true && segment.Suv === true) {
      getData(`http://localhost:1234/sedan&suv/${location}`);
    }
    if (segment.HatchBack === true) {
      getData(`http://localhost:1234/hatch/${location}`);
    }
    if (segment.Sedan === true) {
      getData(`http://localhost:1234/sedan/${location}`);
    }
    if (segment.Suv === true) {
      getData(`http://localhost:1234/suv/${location}`);
    }
  }, [segment]);

  const [fuel, setFuel] = React.useState({
    Petrol: false,
    Diesel: false,
  });

  const handleChangeFuel = (event) => {
    setFuel({ ...fuel, [event.target.name]: event.target.checked });
  };

  React.useEffect(() => {
    if (fuel.Petrol === true && fuel.Diesel === true) {
      return getData(getUrl);
    }
    if (fuel.Petrol === false && fuel.Diesel === false) {
      return getData(getUrl);
    }
    if (fuel.Petrol === true) {
      return getData("http://localhost:1234/petrol");
    }
    if (fuel.Diesel === true) {
      return getData("http://localhost:1234/diesel");
    }
  }, [fuel]);

  const [trans, setTrans] = React.useState({
    Auto: false,
    Manual: false,
  });

  const handleChangeTrans = (event) => {
    setTrans({ ...trans, [event.target.name]: event.target.checked });
  };

  React.useEffect(() => {
    if (trans.Auto === true && trans.Manual === true) {
      return getData(getUrl);
    }
    if (trans.Auto === false && trans.Manual === false) {
      return getData(getUrl);
    }
    if (trans.Auto === true) {
      return getData(`http://localhost:1234/automatic/${location}`);
    }
    if (trans.Manual === true) {
      return getData(`http://localhost:1234/manual/${location}`);
    }
  }, [trans]);

  return (
    <div>
      <Navbar />
      <div className={style.mainContainer}>
        <FilterPart
          handleChangePrice={handleChangePrice}
          price={price}
          handleChangeSegment={handleChangeSegment}
          segment={segment}
          handleChangeFuel={handleChangeFuel}
          fuel={fuel}
          handleChangeTrans={handleChangeTrans}
          trans={trans}
        />
        <CartPart data={data} />
        <SubscriptionFooter />
      </div>
    </div>
  );
};
