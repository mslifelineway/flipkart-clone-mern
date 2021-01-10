import { DataGrid } from "@material-ui/data-grid";

export default function DataTable(props) {
  
  return (
    <div style={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        pageSize={props.perPage}
        checkboxSelection={false}
        pagination
        rowsPerPageOptions={[10, 20, 25, 50, 100]}
        onPageChange={(data) => {
          
        }}
        onRowClick = {(data) => {
          props.onRowClick(data.row._id)
        }}
        // onPageSizeChange={(data) => {
        //   console.log("---page size change" + JSON.stringify(data));
        //   if(data.page * data.pageCount < data.rowCount) {
        //     setCount(20);
        //   } else {
        //     // setCount(data.pageCount);
        //   }
        // }}
       
      />
    </div>
  );
}
