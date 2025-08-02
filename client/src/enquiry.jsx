import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import './enquiry.css'; // Optional: your custom styles

export default function Enquiry() {
  const [enquiryList, setEnquiryList] = useState([]);

  // ✅ Function to delete a row by ID with SweetAlert
  const deleteRow = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/website/enquiry/enquiryDelete/${id}`)
          .then((res) => {
            if (res.data.status) {
              Swal.fire("Deleted!", "Enquiry has been deleted.", "success");
              setEnquiryList(enquiryList.filter(item => item._id !== id));
            } else {
              Swal.fire("Error", "Failed to delete enquiry", "error");
            }
          })
          .catch((err) => {
            console.error("Error while deleting:", err);
            Swal.fire("Error", "Something went wrong", "error");
          });
      }
    });
  };

  // ✅ Function to show alert for update (placeholder)
  const Row = (id) => {
    alert("Edit functionality is not implemented yet for ID: " + id);
  };

  // Save Enquiry
  const saveEnquiry = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let Form = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message')
    };

    axios.post('http://localhost:8000/api/website/enquiry/insert', Form)
      .then((res) => {
        console.log("Response:", res.data);
        toast.success('Enquiry Saved Successfully');
        e.target.reset(); // Clear form
        getAllEnquiries(); // Refresh list after save
      })
      .catch((err) => {
        console.error("Error while saving:", err);
        toast.error('Failed to save enquiry');
      });
  };

  // Fetch All Enquiries
  const getAllEnquiries = () => {
    axios.get('http://localhost:8000/api/website/enquiry/view')
      .then((res) => {
        if (res.data.status) {
          setEnquiryList(res.data.enquiryList);
        } else {
          toast.warning('No enquiries found');
        }
      })
      .catch((err) => {
        console.error("Failed to load enquiry list:", err);
        toast.error('Failed to load enquiry list');
      });
  };

  useEffect(() => {
    getAllEnquiries();
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container-fluid py-4 bg-white min-vh-100">
        <h1 className="text-center mb-4 fw-bold">User Enquiry</h1>

        <div className="row">
          {/* Enquiry Form */}
          <div className="col-md-4 px-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="card-title fw-bold mb-3">Enquiry Form</h4>
                <form onSubmit={saveEnquiry}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" name="phone" required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" name="message" rows="3" required></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
              </div>
            </div>
          </div>

          {/* Enquiry List */}
          <div className="col-md-8 px-4">
            <h4 className="fw-bold mb-3">Enquiry List</h4>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiryList.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">No enquiries found.</td>
                    </tr>
                  ) : (
                    enquiryList.map((enquiry, idx) => (
                      <tr key={idx}>
                        <td>{enquiry.name}</td>
                        <td>{enquiry.email}</td>
                        <td>{enquiry.phone}</td>
                        <td>{enquiry.message}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button onClick={() => deleteRow(enquiry._id)} className="btn btn-sm btn-danger">Delete</button>
                            <button onClick={() => Row(enquiry._id)} className="btn btn-sm btn-secondary">Update</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}