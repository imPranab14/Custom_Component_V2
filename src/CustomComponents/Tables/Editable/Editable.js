import { useEffect, useState } from "react";
import { getInputBoxFromType } from "../../../services/editTable";
//import EditabrlStyle from "../Editable/Editable.module.scss";
import EditabrlStyle from "../Editable/Editable.module.css";
import { FaEdit } from "react-icons/fa";
import { FaPrescriptionBottleAlt } from "react-icons/fa";

const Editable = ({
  data,
  columns,
  sortableCols,
  tableHeader,
  recordsPerPageOption,
  defaultRecordPerPage,
  uniqueId,
}) => {
  const [recordsPerPage, setRecordsPerPage] = useState(defaultRecordPerPage);
  const [tabData, setTabData] = useState(data);
  const [sortedColumn, setSortedColumn] = useState("");
  const [sortedAsc, setSortedAsc] = useState(0);
  const [pages, setPages] = useState(Math.ceil(data.length / recordsPerPage));
  const [pageNo, setPageNo] = useState(1);
  const [pageStartIndex, setPageStartIndex] = useState(0);
  const [pageEndIndex, setPageEndIndex] = useState(recordsPerPage - 1);
  const [datainPage, setDatainPage] = useState(
    data.filter((item, index) => index < recordsPerPage)
  );
  const [selectedOneRowForEdit, setSelectedOneRowForEdit] = useState();
  const [selectedOneRowForDelete, setSelectedOneRowForDelete] = useState();

  // useEffect(() => {
  //   setTabData([...data]);
  //   sortColumn("", true);
  // }, [pageStartIndex , pageEndIndex , ]);

  const changePage = (next) => {
    let page = next
      ? pageNo + 1 > pages
        ? pages
        : pageNo + 1
      : pageNo - 1 < 1
      ? 1
      : pageNo - 1;

    let start = Math.max((page - 1) * recordsPerPage, 0);
    let end = Math.min(page * recordsPerPage - 1, tabData.length - 1);

    console.log(start, end, pages, page);
    console.log(tabData.length);
    let tempDataArray = [];
    for (let index = start; index <= end; index++) {
      tempDataArray.push(tabData[index]);
    }

    setPageNo(page);
    setPageStartIndex(start);
    setPageEndIndex(end);
    setDatainPage(tempDataArray);
  };

  const sortColumn = (col, asc) => {
    if (asc) {
      setSortedAsc(1);
    } else {
      setSortedAsc(-1);
    }

    if (sortedColumn !== col) {
      setSortedAsc(1);
      setSortedColumn(col);
    }
    let sortedData = asc
      ? data.sort((row1, row2) =>
          row1[col] > row2[col] ? 1 : row1[col] < row2[col] ? -1 : 0
        )
      : data.sort((row1, row2) =>
          row1[col] > row2[col] ? -1 : row1[col] < row2[col] ? 1 : 0
        );

    setTabData([...sortedData]);

    let tempDataArray = [];
    for (let index = pageStartIndex; index <= pageEndIndex; index++) {
      tempDataArray.push(sortedData[index]);
    }
    setDatainPage(tempDataArray);
  };

  const recordSelectionPerPageChange = (noOfRecords) => {
    let start = 0;
    let end = Math.min(noOfRecords - 1, tabData.length - 1);

    let tempDataArray = [];
    for (let index = start; index <= end; index++) {
      tempDataArray.push(tabData[index]);
    }

    setRecordsPerPage(noOfRecords);
    setPages(Math.ceil(data.length / noOfRecords));
    setPageNo(1);
    setDatainPage(tempDataArray);
  };

  const editRow = (selectedOneRow) => {
    // EditOneRowPopUp
    // call edit popup form here
    console.log(selectedOneRow);
    setSelectedOneRowForEdit(selectedOneRow);
  };

  const deleteRow = (selectedOneRow) => {
    // Call confirmation popup here
    // DeleteOneRowPopUp
    setSelectedOneRowForDelete(selectedOneRow);
    console.log(selectedOneRow);
  };

  const EditOneRowPopUp = ({ selectedRow }) => {
    // console.log("popv b", filterableColumns)
    // filterableCols.forEach(element => {
    //   console.log(element)
    // });
    // return <div className={"popup " + true ? "showpopup" : "hidepopup"}>
    //   <button onClick={() => closePopup()}>close</button>
    //   <div>        {
    //     filterableColumns.map((oneCol) =>
    //       <div><span>{oneCol.column} : </span><input value={oneCol.column} /></div>
    //     )
    //   }</div>
    // </div>
  };

  const DeleteOneRowPopUp = ({ selectedRow }) => {};

  const onUpdateConfirm = () => {
    let tempUpdatedData = tabData.map((item) =>
      item[uniqueId] === selectedOneRowForEdit[uniqueId]
        ? selectedOneRowForEdit
        : item
    );

    let tempDataArray = [];
    for (let index = pageStartIndex; index <= pageEndIndex; index++) {
      tempDataArray.push(tempUpdatedData[index]);
    }
    setDatainPage(tempDataArray);

    setSelectedOneRowForEdit(null);
  };

  const onUpdateCancel = () => {
    setSelectedOneRowForEdit(null);
  };

  const onDeleteConfirm = (selectedRow) => {
    // console.log(selectedRow, tabData)
    let tempRowData = tabData.filter(
      (row) => row[uniqueId] !== selectedRow[uniqueId]
    );
    setTabData(tempRowData);

    let tempDataArray = [];
    for (let index = pageStartIndex; index <= pageEndIndex; index++) {
      tempDataArray.push(tempRowData[index]);
    }
    setDatainPage(tempDataArray);

    // recordSelectionPerPageChange(recordsPerPage)
    setSelectedOneRowForDelete(null);
  };

  const onDeleteCancel = () => {
    setSelectedOneRowForDelete(null);
  };

  const editFormContentChange = (e) => {
    const { name, value } = e.target;
    setSelectedOneRowForEdit({ ...selectedOneRowForEdit, [name]: value });
  };

  return (
    <div className={EditabrlStyle.MainBody}>
      <div className={EditabrlStyle.frame}>
        {tableHeader && (
          <h2 className={EditabrlStyle.MainHeader}>{tableHeader}</h2>
        )}

        <>
        <div >
        
          {selectedOneRowForEdit && (
            <div  className={EditabrlStyle.modal}  >
             <div className={EditabrlStyle.modalcontent}>
             <h3 className={EditabrlStyle.PopupHeader}>Popup Form</h3>
              <div className={EditabrlStyle.Tdata}>
              {columns.map((col, index) =>
                getInputBoxFromType(
                  col,
                  selectedOneRowForEdit,
                  editFormContentChange,
                  index
                )
              )}
              </div>
              <div className={EditabrlStyle.PopupFooter}>
              <button className={EditabrlStyle.button33} onClick={() => onUpdateConfirm()}>Update</button>
              <button className={EditabrlStyle.button34} onClick={() => onUpdateCancel()}>Cancel</button>
              </div>
              </div>
            </div>
            
          )}
        </div>
        
        </>
        


        <>
          {selectedOneRowForDelete && (
             <div  className={EditabrlStyle.modal}  >
             <div className={EditabrlStyle.modalcontent}>
              Popup Delete , Are you sure want to delete id :{" "}
              {selectedOneRowForDelete[uniqueId]}
              <button onClick={() => onDeleteConfirm(selectedOneRowForDelete)}>
                Delete
              </button>
              <button onClick={() => onDeleteCancel(selectedOneRowForDelete)}>
                Cancel
              </button>
            </div>
            </div>
          )}
        </>

        <table>
          <tr>
            {columns.map((col, index) => (
              <th>
                {col.sortable ? (
                  <button
                    className={EditabrlStyle.TableHeaderText}
                    onClick={() =>
                      sortColumn(
                        col.column,
                        sortedColumn === col.column && sortedAsc === 1
                          ? false
                          : true
                      )
                    }
                  >
                    {col.column}{" "}
                    {col.column === sortedColumn && (
                      <span>
                        {sortedAsc === -1 && <i>&#8595;</i>}
                        {sortedAsc === 1 && <i>&#8593;</i>}
                      </span>
                    )}
                  </button>
                ) : (
                  col.column
                )}
              </th>
            ))}
            <th className={EditabrlStyle.TableHeaderText}>Edit</th>
            <th className={EditabrlStyle.TableHeaderText}>Delete</th>
          </tr>

          {datainPage &&
            datainPage.map((row) => {
              return (
                <tr>
                  {" "}
                  {columns.map((col) => (
                    <td>{row[col.column]}</td>
                  ))}{" "}
                  <td>
                    <button
                      className={EditabrlStyle.Editbtn}
                      onClick={() => editRow(row)}
                    >
                      {" "}
                      <FaEdit />
                    </button>
                  </td>
                  <td>
                    <button
                      className={EditabrlStyle.delbtn}
                      onClick={() => deleteRow(row)}
                    >
                      <FaPrescriptionBottleAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
        </table>

        <div className={EditabrlStyle.TablePagination}>
          <button
            className={EditabrlStyle.PreNext_btn}
            onClick={() => changePage(false)}
          >
            &lt;
          </button>
          <span className={EditabrlStyle.PageNo}>{pageNo}</span>
          <button
            className={EditabrlStyle.PreNext_btn}
            onClick={() => changePage(true)}
          >
            &#62;
          </button>
          <select
            name="recordsPerPage"
            className={EditabrlStyle.PageOption}
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
  );
};

export default Editable;
