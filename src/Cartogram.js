import Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';
import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Ensure your Firebase config is correct
import { collection, getDocs } from 'firebase/firestore';
import places from './places.json';

// Initialize the map module
HighchartsMap(Highcharts);

const MyComponent = () => {
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    const loadMapData = async () => {
      try {
        // Fetch data from Firestore
        const querySnapshot = await getDocs(collection(db, 'dengueData'));
        const locationCaseMap = {};

        // Create a mapping of locations to total cases
        querySnapshot.forEach((doc) => {
          const { location, cases } = doc.data();
          if (location && cases !== undefined) {
            const lowerLocation = location.toLowerCase();
            if (locationCaseMap[lowerLocation]) {
              locationCaseMap[lowerLocation] += cases; // Sum cases for the same location
            } else {
              locationCaseMap[lowerLocation] = cases; // Initialize with cases
            }
          }
        });

        // Mapping locations to their corresponding hc-key
        const locationToKeyMap = {
          "benguet": "ph-bg",
          "olongapo city": "ph-7018",
          "ifugao": "ph-if",
          "cagayan de oro city":"ph-6991",
          "iligan city":"ph-1000",
          "misamis oriental": "ph-mn",
          "negros oriental": "ph-nr",
          "negros occidental": "ph-nd",
          "abra":"ph-ab",
          "agusan del norte":"ph-an",
          "agusan del sur":"ph-as",
          "aklan":"ph-ak",
          "albay":"ph-al",
          "angeles city":"ph-7017",
          "antique":"ph-aq",
          "apayao":"ph-2658",
          "aurora":"ph-au",
          "bacolod city":"ph-6987",
          "baguio city":"ph-7021",
          "basilan":"ph-bs",
          "surigao del sur":"ph-ss",
          "bataan":"ph-ba",
          "batanes":"ph-bn",
          "batangas":"ph-bt",
          "biliran":"ph-bi",
          "bohol":"ph-bo",
          "bukidnon":"ph-bk",
          "bulacan":"ph-bu",
          "butuan city":"ph-6995",
          "cagayan":"ph-cg",
          "caloocan city":"ph-7002",
          "camarines norte":"ph-cn",

          "camarines sur":"ph-cs",
          "camiguin":"ph-cm",
          "capiz": "ph-cp",
          "catanduanes":"ph-ct",
          "cavite":"ph-cv",
          "cebu":"ph-cb",
          "cebu city":"ph-6983",
          "lapu-lapu city":"ph-6985",
          "cotabato city":"ph-6988",
          "dagupan city":"ph-7022",
          "davao city":"ph-6989",
          "davao de oro":"ph-cl",
          "davao del norte":"ph-dv",
          "davao del sur":"ph-ds",
          "davao oriental":"ph-do",
          "dinagat islands":"ph-di",
          "eastern samar":"ph-es",
          //continuation
          "general santos city":"ph-6990",
          "guimaras":"ph-gu",
          "ilocos norte":"ph-in",
          "ilocos sur":"ph-is",
          "iloilo":"ph-ii",
          "iloilo city":"ph-6986",
          "isabela": "ph-ib",
          "isabela city":"ph-6457",
          "kalinga":"ph-ap",
          "la union":"ph-lu",
          "laguna":"ph-lg",
          "lanao del norte":"ph-ln",
          "lanao del sur":"ph-ls",
          "las pinas city":"ph-7013",
          "leyte":"ph-le",
          "lucena city":"ph-7019",
          "maguindanao":"ph-mg",
          "makati city":"ph-7010",
          "malabon city":"ph-7003",
          "mandaluyong city":"ph-1852",
          "mandaue city":"ph-6984",
          "manila city":"ph-7000",
          "marikina city":"ph-7007",
          "marinduque":"ph-mq",
          "masbate":"ph-mb",
          "misamis occidental":"ph-md",
          "mountain province":"ph-mt",
          "muntinlupa city":"ph-7014",
          "naga city":"ph-6999",
          "navotas city":"ph-7001",
          "north cotabato":"ph-nc",
          "northern samar":"ph-ns",
          "nueva ecija":"ph-ne",
          "nueva viscaya": "ph-nv",
          "occidental mindoro":"ph-mc",
          "oriental mindoro":"ph-mr",
          "ormoc city":"ph-6997",
          "palawan":"ph-pl",
          "pampanga":"ph-pm",
          "pangasinan":"ph-pn",
          "paranaque city":"ph-7012",
          "pasay city":"ph-7011",
          "pasig city":"ph-7009",
          "pateros": "ph-7016",
          "puerto princesa city":"ph-6996",
          "quezon":"ph-qz",
          "quezon city":"ph-7006",
          "quirino":"ph-qr",
          "rizal":"ph-ri",
          "romblon":"ph-ro",
          "samar":"ph-sm",
          "san juan city": "ph-7008",
          "santiago city":"ph-7020",
          "sarangani":"ph-sg",
          "sisquijor":"ph-sq",
          "sorsogon":"ph-sr",
          "south cotabato":"ph-sc",
          "southern leyte":"ph-sl",
          "sultan kudarat":"ph-sk",
          "sulu":"ph-su",
          "tacloban":"ph-6998",
          "taguig city":"ph-7015",
          "tarlac":"ph-tr",
          "tawi-tawi":"ph-tt",
          "valenzuela city":"ph-7004",
          "zambales":"ph-zm",
          "zamboanga city":"ph-6456",
          "zamboanga del norte":"ph-zn",
          "zamboanga del sur":"ph-zs",
          "zamboanga sibugay":"ph-2603",




          // Continue for all locations...
        };

        // Transform the data for Highcharts
        const chartData = Object.entries(locationCaseMap).map(([location, totalCases]) => {
          const hcKey = locationToKeyMap[location];
          return hcKey ? [hcKey, totalCases] : null;
        }).filter(Boolean);

        // Set the data for rendering
        setMapData(chartData);
        
        // Create the chart
        Highcharts.mapChart('container', {
          chart: {
            map: places,
          },
          title: {
            text: 'Dengue Cases in the Philippines',
          },
          subtitle: {
            text: 'Make sure to hover your mouse on the selected region to discover the total amounts of Dengue cases in that particular location.',
          },
          mapNavigation: {
            enabled: true,
            buttonOptions: {
              verticalAlign: 'bottom',
            },
          },
          colorAxis: {
            min: 0,
            stops: [
              [0, '#FFE5B4'],   // Light orange for 0 cases
              [0.5, '#FFA500'], // Medium orange for moderate cases
              [1, '#FF4500'],   // Dark orange for high cases
            ],
          },
          tooltip: {
            headerFormat: '',
            pointFormat: '<b>{point.name}</b><br>Cases: {point.value}',
          },
          series: [{
            data: chartData,
            name: 'Dengue Cases',
            states: {
              hover: {
                color: '#FFD700', // Bright yellow on hover
              },
            },
            dataLabels: {
              enabled: false, // Disable labels by default
            },
          }],
        });

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    loadMapData();
  }, []);

  return (
    <div>
      <style>
        {`
          #container {
            height: 500px;
            min-width: 310px;
            max-width: 800px;
            margin: 0 auto;
          }
          .loading {
            margin-top: 80px;
            text-align: center;
            color: gray;
          }
        `}
      </style>
      <div id="container" className="loading">Loading...</div>
    </div>
  );
};

export default MyComponent;
