import { Button, Table } from "react-bootstrap";
import "../tableComponent/table.css";

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

interface TableComponentProps {
  theadInformation: string[];
  tbdodyInformation: any[];
}

const TableComponent: React.FC<TableComponentProps> = (props) => {
  return (
    <div className="table-responsive">
      <Table responsive="xl" bordered>
        <thead>
          <tr>
            {props.theadInformation.map((information, index) => (
              <th key={index}>{information}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.tbdodyInformation &&
            props.tbdodyInformation.map((information, index) => (
              <tr key={information.id} className="text-left">
                <td>{index + 1}</td>
                <td>{information.name}</td>
                <td>{information.username}</td>
                <td>{information.email}</td>
                <td>{information.phone}</td>
                <td>{information.website}</td>
                <td>
                  {information.address.street} - {information.address.suite},{" "}
                  {information.address.city} - {information.address.zipcode}
                </td>
                <td className="d-flex">
                  <Button className="button-edit" variant="outline-dark">
                    <AiOutlineEdit />
                  </Button>
                  <Button className="button-delete" variant="outline-danger">
                    <AiOutlineDelete />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
