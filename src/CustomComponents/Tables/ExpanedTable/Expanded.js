import { useState, useEffect } from "react";
import ExpandedTaleStyle from "../ExpanedTable/ExpadedTale.module.scss"

const Expanded = ({ data,
    columns,
    filterableCols,
    sortableCols,
    tableHeader,
    recordsPerPageOption,
    defaultRecordPerPage,
    uniqueId,
    upDateDat,
    innerTableColumns
}) => {

    const [recordsPerPage, setRecordsPerPage] = useState(defaultRecordPerPage);
    const [tabData, setTabData] = useState(data);
    const [sortedColumn, setSortedColumn] = useState("");
    const [sortedAsc, setSortedAsc] = useState(0);
    const [popupVisibility, setPopupVisibility] = useState(false);
    const [valuesToBeFiltered, setValuesToBeFiltered] = useState();
    const [filterableColumn, setFilterableColumn] = useState(columns.filter(col => col.filterable));
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
        })
    })


    const changeFilterableInputs = (e) => {

        const { name, value } = e.target;

        let tempFilteredStringObject = { ...valuesToBeFiltered, [name]: value }

        console.log(tempFilteredStringObject)
        // filterLogic to be implemented here

        let filteredData = data.filter((itemRow) => {

            let dataPresentInRow = true;
            columns.forEach((cols, index) => {

                let columnName = cols.column;

                let columnData = itemRow[columnName].toString();


                if (cols.filterable && tempFilteredStringObject[columnName] !== "" && !columnData.includes(tempFilteredStringObject[columnName])) {
                    console.log(tempFilteredStringObject[columnName], columnData)
                    dataPresentInRow = false
                }
            })

            return dataPresentInRow;

        });

        setTabData([...filteredData]);
        setValuesToBeFiltered(tempFilteredStringObject)

        paginator(null, null, null, null, filteredData)
    }

    const changePage = (next) => {
        let page = next
            ? pageNo + 1 > pages
                ? pages
                : pageNo + 1
            : pageNo - 1 < 1
                ? 1
                : pageNo - 1;

        paginator(null, null, recordsPerPage, page, null)
    };


    const recordSelectionPerPageChange = (noOfRecords) => {
        paginator(null, null, noOfRecords, null, null)
        setRecordsPerPage(noOfRecords)
    };

    const paginator = (recordStartIndex, recordEndIndex, noOfRecords, currrPageNo, sortedArrayData) => {

        currrPageNo = currrPageNo ? currrPageNo : 1;
        noOfRecords = noOfRecords ? noOfRecords : defaultRecordPerPage;
        sortedArrayData = sortedArrayData ? sortedArrayData : tabData;

        recordStartIndex = recordStartIndex ? recordStartIndex : Math.max((currrPageNo - 1) * noOfRecords, 0);
        recordEndIndex = recordEndIndex ? recordEndIndex : Math.min(currrPageNo * noOfRecords - 1, sortedArrayData.length - 1);

        console.log(recordStartIndex, recordEndIndex, noOfRecords, currrPageNo, sortedArrayData)

        let tempDataArray = sortedArrayData.slice(recordStartIndex, recordEndIndex + 1);

        setPages(Math.ceil(sortedArrayData.length / noOfRecords));
        setPageStartIndex(recordStartIndex);
        setPageEndIndex(recordEndIndex)
        setPageNo(currrPageNo);
        setDatainPage([...tempDataArray]);

    }


    return <div className={ExpandedTaleStyle.MainBody}> 
    <div className={ExpandedTaleStyle.frame}>
    {tableHeader && <h2 className={ExpandedTaleStyle.MainHeader}>{tableHeader}</h2>}
        <table>
            <tr>
            <th className={ExpandedTaleStyle.TableHeaderText}>Expand</th>
                {columns && valuesToBeFiltered && columns.map((col, index) => (
                    <th>
                        {col.filterable ?
                            <input placeholder={col.column} value={valuesToBeFiltered[col.column]}
                                name={col.column}
                                onChange={(e) => changeFilterableInputs(e)}
                            />
                            : <input disabled />


                        }
                    </th>
                ))}

                {columns.map((col, index) => (
                    <th  className={ExpandedTaleStyle.TableHeaderText}>
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
                
             
            </tr>

            {datainPage &&
                datainPage.map((row) => {
                    return (
                        <tr>
                            <td><button >expandIcon</button></td>
                            {columns.map((col) => (
                                <td>{row[col.column]}</td>
                            ))}


                            {
                                row.expandableData &&
                                <table>
                                    {row.expandableData.map((innerRow, index) =>
                                        <tr>
                                            {innerTableColumns && innerTableColumns.map((innerColName, index) =>
                                                <td>{innerRow[innerColName]}</td>
                                            )}
                                        </tr>
                                    )
                                    }

                                </table>

                            }
                        </tr>
                    );
                })}
        </table>  
        <div className={ExpandedTaleStyle.TablePagination}>
          <button
            className={ExpandedTaleStyle.PreNext_btn}
            onClick={() => changePage(false)}
          >
            &lt;
          </button>
          <span className={ExpandedTaleStyle.PageNo}>{pageNo}</span>
          <button
            className={ExpandedTaleStyle.PreNext_btn}
            onClick={() => changePage(true)}
          >
            &#62;
          </button>
          <select
            name="recordsPerPage"
            className={ExpandedTaleStyle.PageOption}
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
}

export default Expanded