import "./App.css";

import Sortable from "./CustomComponents/Tables/Sortable/SortableTable";
import Filterable from "./CustomComponents/Tables/Filterable/FilterableTable";
import Editable from "./CustomComponents/Tables/Editable/Editable";
import SortFilter from "./CustomComponents/Tables/Sort-Filter/Sort-Filter";
import AllTogether from "./CustomComponents/Tables/Sort-Filter-Edit/Sort-Filter-Edit";
import Crud from "./CustomComponents/Tables/Extras/CrudTable";
import CrudIe from "./CustomComponents/Tables/CRUDIE/CRUDIE";
import ImportExport from "./CustomComponents/Tables/Extras/FileImportExport";
import Expandable from "./CustomComponents/Tables/ExpanedTable/Expanded";

// importing data
import dummyData from "./data/data1";
import expandableTableData from "./data/expandableData";
import { useEffect, useState } from "react";
import CRUDIE from "./CustomComponents/Tables/CRUDIE/CRUDIE";

import HorizontalSLider from "./CustomComponents/Slider/HorizontalCarousel/HorizontalSlider";

import Sliders from "./Pages/Sliders";
import PopupPage from "./Pages/Popups";
import Popover from "./Pages/Popover";
import Forms from "./Pages/Form";

import Cards from "./Pages/Cards";

function App() {
  const [columns, setColumns] = useState();
  const [data, setData] = useState(dummyData);
  useEffect(() => {
    let tempCols = Object.keys(dummyData[0]).map((colName) => ({
      column: colName,
      sortable: true,
      editable: true,
      filterable: true,
      formInputDetails: {
        defaultVal: "abcd",
        inputType: "text",
        radioLabel: "Please select your favorite Web language:",
        data: [
          { label: "xyz", value: "abc" },
          { label: "uvw", value: "def" },
        ],
        min: 0,
        max: 5,
      },
      // if inut type is dropdown then [{ label: "xyz", value: "abc" }]
      // if it it text then {placeholder: "xyz" , name: "name"}
      // if checkbox {label: "label" }
      // if date {min: "" , max: "" }
      // if int {min: "" , max: "" }
      // if textarea  {placeholder: "xyz" , name: "name" , lines: 2}
    }));

    tempCols.innerColumns = [
      {
        column: "current_address",
        sortable: true,
        filterable: true,
      },
      {
        column: "permanent_address",
        sortable: true,
        filterable: true,
      },
    ];

    tempCols.innerColumns.innerColumns = [
      {
        column: "current_address",
        sortable: true,
        filterable: true,
      },
      {
        column: "permanent_address",
        sortable: true,
        filterable: true,
      },
    ];
    setColumns(tempCols);
    console.log(tempCols);
  }, []);

  const upDateData = (newaData) => {
    setData(newaData);
  };
  return (
    <div>
     {/* <div>
        {dummyData && columns && (
          <Sortable
            data={dummyData}
            columns={columns}
            tableHeader="Sortable Table"
            recordsPerPageOption={[5, 10, 20]}
            defaultRecordPerPage={5}
          />
        )}
      </div>  

        {/* <div>
        {dummyData && columns && (
          <Filterable
            data={dummyData}
            columns={columns}
            filterableCols={columns}
            tableHeader="Filter Table"
            recordsPerPageOption={[5, 10, 20]}
            defaultRecordPerPage={5}
          />
        )}
      </div>   

      {/* <div>
        {dummyData && columns && (
          <Editable
            data={dummyData}
            columns={columns}
            sortableCols={columns}
            tableHeader="Editable Table"
            recordsPerPageOption={[5, 10, 20]}
            defaultRecordPerPage={5}
            uniqueId="id"
          />
        )}
      </div>  */}

      {/* <div>
        {dummyData && columns && (
          <CRUDIE
            data={data}
            columns={columns}
            filterableCols={columns}
            sortableCols={columns}
            tableHeader="Editable Table"
            recordsPerPageOption={[5, 10, 20]}
            defaultRecordPerPage={5}
            uniqueId="id"
            upDateData={upDateData}
          />
        )}
      </div> */}

      {/* <div>
        {dummyData && columns && (
          <Expandable
            data={data}
            columns={columns}
            filterableCols={columns}
            sortableCols={columns}
            tableHeader="Editable Table"
            recordsPerPageOption={[5, 10, 20]}
            defaultRecordPerPage={5}
            uniqueId="id"
            upDateData={upDateData}
            innerTableColumns={["current_address", "permanent_address"]}
          />
        )}
      </div>   */}
       {/* <Forms />  */}

     <Sliders />

      <PopupPage />

       <Popover />

      {/* <Cards />    */}
    </div>
  );
}

export default App;
