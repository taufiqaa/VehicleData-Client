import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useQuery, useMutation } from "react-query";
import DeleteData from "../components/delete-data";
import EmptyBox from "../assets/emptybox.png";
import { API } from "../config/api";
import Form from "react-bootstrap/Form";

export default function DashboardData() {
  document.title = "Dashboard";

  let navigate = useNavigate();
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { data: vehicleData, refetch } = useQuery("vehicleData", async () => {
    const response = await API.get("/vehicle-data");
    return response.data;
  });

  const handleUpdate = (id) => {
    navigate("/edit-data/" + id);
  };

  const handleDetail = (id) => {
    navigate("/detail-data/" + id);
  };

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/vehicle-data/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  const [filter, setFilter] = useState("");
  let searchData = (e) => {
    setFilter(e.target.value);
  };

  let dataFilter = vehicleData?.filter((item) => {
    if (filter === "") {
      return item;
    } else if (
      item.registration_number.toLowerCase().includes(filter.toLowerCase())
    ) {
      return item;
    } else if (item.owner.toLowerCase().includes(filter.toLowerCase())) {
      return item;
    }
  });

  return (
    <>
      <Container className="py-5">
        <Row>
          <div className="text-header-category mb-4" style={{ color: `black` }}>
            <h2>Aplikasi Data Kendaraan</h2>
          </div>
          <div
            style={{
              width: "100%",
              height: "13rem",
              backgroundColor: "#fce4d6",
              marginBottom: "1rem",
              padding: "1rem",
            }}
          >
            <Form.Label
              htmlFor="registration_number"
              style={{ fontWeight: "bold" }}
            >
              Cari No Registrasi/Nama Pemilik
            </Form.Label>
            <Form.Control
              type="search"
              id="registration_number"
              onChange={searchData.bind(this)}
              style={{ marginBottom: "1rem", height: "2rem", width: "30%" }}
            />
          </div>
          <Col xs="6"></Col>
          <Col xs="12">
            <div className="d-flex justify-content-end mb-1">
              <Button
                className="btn-sm btn-primary"
                style={{ height: "2rem", width: "8rem" }}
                onClick={() => navigate("/add-data")}
              >
                Add
              </Button>
            </div>
            {vehicleData?.length !== 0 ? (
              <Table size="lg" striped hover>
                <thead>
                  <tr
                    style={{
                      height: "1rem",
                      backgroundColor: "#bac5e1",
                    }}
                  >
                    <th width="1%" className="text-center">
                      No
                    </th>
                    <th>No Registrasi</th>
                    <th>Nama Pemilik</th>
                    <th>Merk Kendaraan</th>
                    <th>Tahun Pembuatan</th>
                    <th>Kapasitas</th>
                    <th>Warna</th>
                    <th>Bahan Bakar</th>
                    <th style={{ width: "10rem", textAlign: "center" }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataFilter?.map((data, index) => (
                    <tr>
                      <td className="align-middle text-center">{index + 1}</td>
                      <td className="align-middle">
                        {data?.registration_number}
                      </td>
                      <td className="align-middle">{data?.owner}</td>
                      <td className="align-middle">{data?.vehicle_brand}</td>
                      <td className="align-middle">{data?.production_year}</td>
                      <td className="align-middle">
                        {data?.cilinder_capacity}
                      </td>
                      <td className="align-middle">{data?.vehicle_color}</td>
                      <td className="align-middle">{data?.fuel}</td>
                      <td className="align-middle">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <h6
                            style={{
                              fontSize: "4",
                              color: "brown",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              handleDetail(data.id);
                            }}
                          >
                            Detail
                          </h6>
                          <h6
                            style={{
                              fontSize: "4",
                              color: "navy",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              handleUpdate(data.id);
                            }}
                          >
                            Edit
                          </h6>
                          <h6
                            onClick={() => {
                              handleDelete(data.id);
                            }}
                            style={{
                              fontSize: "4",
                              color: "red",
                              cursor: "pointer",
                            }}
                          >
                            Delete
                          </h6>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="text-center pt-5">
                <img
                  src={EmptyBox}
                  className="img-fluid"
                  style={{ width: "10%" }}
                  alt="empty"
                />
                <div className="mt-3">Tidak ada data kendaraan</div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
}
