import "./index.scss"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Heading from "../heading";

interface Rally {
  id: number;
  name: string;
  season: string;
  country: string;
  beginning: Date;
  end: Date;
}

const UpcomingRalliesBar: React.FC = () => {
  const [rallies, setRallies] = useState<Rally[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Rally[]>('http://localhost:3000/rallies/upcoming');
        setRallies(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="sideDiv">
        <Heading level={1}>Upcoming Rallies</Heading>
        {rallies.map((rally, index) => (
          <div key={index}>
            <p>{rally.name}</p>
            <p>{rally.beginning.toString().substring(0, 10)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingRalliesBar;