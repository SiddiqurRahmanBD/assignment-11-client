import React, { useEffect, useState } from "react";

import useAxios from "../../Hooks/useAxios";
import { useParams } from "react-router";
import { CloudRain } from "lucide-react";
import DonationDetailsCard from "../../Components/DonationCard/DonationDetailsCard";

const DonationDetails = () => {
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  console.log(id);
  const axiosInstance = useAxios();

  useEffect(() => {
    if (!id) return;

    axiosInstance
      .get(`/donation-details/${id}`)
      .then((res) => {
        console.log(res);
        setDetails(res.data);
      })
      .catch((err) => console.error(err));
  }, [axiosInstance, id]);

  return (
    <div>

        {
            details && <DonationDetailsCard details={details}/>
        }
    </div>
  );
};

export default DonationDetails;
