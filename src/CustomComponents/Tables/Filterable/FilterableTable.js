import { useEffect, useState } from "react";
//import FilterTableStyle from "../Filterable/FilterTable.module.scss";
import FilterTableStyle from "../Filterable/FilterTable.module.css";

const FilterableTable = ({
  data,
  columns,
  filterableCols,
  tableHeader,
  recordsPerPageOption,
  defaultRecordPerPage,
}) => {
  const [recordsPerPage, setRecordsPerPage] = useState(defaultRecordPerPage);
  const [tabData, setTabData] = useState(data);
  const [sortedColumn, setSortedColumn] = useState("");
  const [sortedAsc, setSortedAsc] = useState(0);
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [valuesToBeFiltered, setValuesToBeFiltered] = useState();
  const [filterableColumn, setFilterableColumn] = useState(
    columns.filter((col) => col.filterable)
  );
  const [pages, setPages] = useState(Math.ceil(data.length / recordsPerPage));
  const [pageNo, setPageNo] = useState(1);
  const [pageStartIndex, setPageStartIndex] = useState(0);
  const [pageEndIndex, setPageEndIndex] = useState(recordsPerPage - 1);
  const [datainPage, setDatainPage] = useState(
    data.filter((item, index) => index < recordsPerPage)
  );
  // const [filterStrings, setFilterString] = useState();

  useEffect(() => {
    let filteredTempObj = {};
    filterableCols.forEach((elemt) => {
      if (elemt.filterable) {
        filteredTempObj[elemt.column] = "";
      }
    });

    setValuesToBeFiltered(filteredTempObj);
  }, []);

  // useEffect(() => {

  //   let filteredData = data.filter((itemRow) => {

  //     let dataPresentInRow = true;
  //     columns.every((cols, index) => {

  //       let columnName = cols.column;
  //       console.log(columnName)
  //       let columnData = itemRow[columnName].toString();
  //       console.log(columnData);

  //       if (cols.filterable && !columnData.includes(valuesToBeFiltered[columnName])) {
  //         dataPresentInRow = false
  //         return false;
  //       }
  //     })

  //     return dataPresentInRow;

  //     // return filterableColumn.some((colName, index) =>
  //     //   itemRow[colName].includes(valuesToBeFiltered[colName])
  //     // );
  //   });

  //   setTabData([...filteredData]);
  // }, [valuesToBeFiltered, filterableColumn, tabData]);

  const changeFilterableInputs = (e) => {
    const { name, value } = e.target;

    let tempFilteredStringObject = { ...valuesToBeFiltered, [name]: value };

    console.log(tempFilteredStringObject);
    // filterLogic to be implemented here

    let filteredData = data.filter((itemRow) => {
      let dataPresentInRow = true;
      columns.forEach((cols, index) => {
        let columnName = cols.column;

        let columnData = itemRow[columnName].toString();

        if (
          cols.filterable &&
          tempFilteredStringObject[columnName] !== "" &&
          !columnData.includes(tempFilteredStringObject[columnName])
        ) {
          console.log(tempFilteredStringObject[columnName], columnData);
          dataPresentInRow = false;
        }
      });

      return dataPresentInRow;

      // return filterableColumn.some((colName, index) =>
      //   itemRow[colName].includes(valuesToBeFiltered[colName])
      // );
    });

    setTabData([...filteredData]);
    setValuesToBeFiltered(tempFilteredStringObject);

    paginator(null, null, null, null, filteredData);
    // console.log({ ...valuesToBeFiltered, [name]: value })
    // console.log(e.target.name, e.target.value)
  };

  // const PopUp = ({ filterableColumns }) => {
  //   // console.log("popv b", filterableColumns)
  //   filterableCols.forEach(element => {
  //     console.log(element)
  //   });

  //   return <div className={"popup " + true ? "showpopup" : "hidepopup"}>
  //     <button onClick={() => closePopup()}>close</button>
  //     <div>        {
  //       filterableColumns.map((oneCol) =>
  //         <div><span>{oneCol.column} : </span><input value={oneCol.column} /></div>

  //       )
  //     }</div>

  //   </div>

  // }

  // const closePopup = () => {
  //   setPopupVisibility(!popupVisibility);
  // }

  // const sortColumn = (col, asc) => {

  //   if (asc) {
  //     setSortedAsc(1);
  //   }
  //   else {
  //     setSortedAsc(-1);
  //   }

  //   if (sortedColumn !== col) {

  //     setSortedAsc(1);
  //     setSortedColumn(col);
  //   }
  //   let sortedData = asc
  //     ? data.sort((row1, row2) => (row1[col] > row2[col]) ? 1 : (row1[col] < row2[col]) ? -1 : 0)
  //     : data.sort((row1, row2) => (row1[col] > row2[col]) ? -1 : (row1[col] < row2[col]) ? 1 : 0)

  //   setTabData([...sortedData]);
  // };

  const changePage = (next) => {
    let page = next
      ? pageNo + 1 > pages
        ? pages
        : pageNo + 1
      : pageNo - 1 < 1
      ? 1
      : pageNo - 1;

    paginator(null, null, recordsPerPage, page, null);
  };

  const recordSelectionPerPageChange = (noOfRecords) => {
    paginator(null, null, noOfRecords, null, null);
    setRecordsPerPage(noOfRecords);
  };

  const paginator = (
    recordStartIndex,
    recordEndIndex,
    noOfRecords,
    currrPageNo,
    sortedArrayData
  ) => {
    currrPageNo = currrPageNo ? currrPageNo : 1;
    noOfRecords = noOfRecords ? noOfRecords : defaultRecordPerPage;
    sortedArrayData = sortedArrayData ? sortedArrayData : tabData;

    recordStartIndex = recordStartIndex
      ? recordStartIndex
      : Math.max((currrPageNo - 1) * noOfRecords, 0);
    recordEndIndex = recordEndIndex
      ? recordEndIndex
      : Math.min(currrPageNo * noOfRecords - 1, sortedArrayData.length - 1);

    console.log(
      recordStartIndex,
      recordEndIndex,
      noOfRecords,
      currrPageNo,
      sortedArrayData
    );

    let tempDataArray = sortedArrayData.slice(
      recordStartIndex,
      recordEndIndex + 1
    );

    setPages(Math.ceil(sortedArrayData.length / noOfRecords));
    setPageStartIndex(recordStartIndex);
    setPageEndIndex(recordEndIndex);
    setPageNo(currrPageNo);
    setDatainPage([...tempDataArray]);
  };

  return (
    <div>
      <div className={FilterTableStyle.MainBody}>
        <div className={FilterTableStyle.frame}>
          {tableHeader && (
            <h2 className={FilterTableStyle.MainHeader}>{tableHeader}</h2>
          )}
          <table>
            <tr>
              {columns.map((col, index) => (
                <th className={FilterTableStyle.TableHeaderFont}>
                  {/* {col.sortable ? <button onClick={() => sortColumn(col.column, (sortedColumn === col.column && sortedAsc === 1) ? false : true)}>
                {col.column}{" "}
                {
                  col.column === sortedColumn && <span>
                    {sortedAsc === -1 && <i>&#8595;</i>}
                    {sortedAsc === 1 && <i >&#8593;</i>}
                  </span>
                }
              </button>
                : col.column


              } */}
                  {col.column}
                </th>
              ))}
            </tr>

            <tr>
              {columns &&
                valuesToBeFiltered &&
                columns.map((col, index) => (
                  <th className={FilterTableStyle.FilterSection}>
                    {col.filterable ? (
                      <input
                        className={FilterTableStyle.FilterInput}
                        placeholder={col.column}
                        value={valuesToBeFiltered[col.column]}
                        name={col.column}
                        onChange={(e) => changeFilterableInputs(e)}
                      />
                    ) : (
                      <input disabled />
                    )}
                  </th>
                ))}
            </tr>

            {datainPage &&
              datainPage.map((row) => {
                return (
                  <tr>
                    {" "}
                    {columns.map((col) => (
                      <td>{row[col.column]}</td>
                    ))}{" "}
                  </tr>
                );
              })}
          </table>{" "}
          <div className={FilterTableStyle.TablePagination}>
            <button
              className={FilterTableStyle.PAgebtn}
              onClick={() => changePage(false)}
            >
              &lt;
            </button>
            <span className={FilterTableStyle.PageNo}>{pageNo}</span>
            <button
              className={FilterTableStyle.PAgebtn}
              onClick={() => changePage(true)}
            >
              &#62;
            </button>
            <select
              name="recordsPerPage"
              className={FilterTableStyle.PageOption}
              onChange={(e) => recordSelectionPerPageChange(e.target.value)}
              value={recordsPerPage}
            >
              {recordsPerPageOption.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterableTable;
