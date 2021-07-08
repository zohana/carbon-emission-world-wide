import axios from "axios";
import { SYSTEM_ERROR } from "../config/constants";
import { GET_CO2_EMISSION } from "./constants";

export const getCo2EmmisionData = () => {
  console.log("co2EmissionService > getCo2EmmisionData called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(GET_CO2_EMISSION)
        .then((res) => {
          console.log("getCo2EmmisionData > axios res=", res);
          const co2Data = res.data;
          resolve(co2Data);
        })
        .catch((err) => {
          console.log("getCo2EmmisionData > axios err=", err);
          reject("Error in getCo2Emission axios!");
        });
    } catch (error) {
      console.error("in services > updateLastCwkId, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
