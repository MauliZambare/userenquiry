import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import './enquiry.css';

export default function Enquiry() {
  const [enquiryList, setEnquiryList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // ✅ Delete Row by ID
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

  // ✅ Load data into form for update
  const Row = (id) => {
    const enquiry = enquiryList.find(item => item._id === id);
    if (enquiry) {
      setFormData(enquiry);
      setCurrentId(id);
      setEditMode(true);
      window.scrollTo(0, 0); // scroll to top where the form is
    }
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save or Update Enquiry
  const saveEnquiry = (e) => {
    e.preventDefault();

    if (editMode) {
      // Update API
      axios.put(`http://localhost:8000/api/website/enquiry/update/${currentId}`, formData)
        .then((res) => {
          toast.success("Enquiry Updated Successfully");
          setEditMode(false);
          setCurrentId(null);
          setFormData({ name: '', email: '', phone: '', message: '' });
          getAllEnquiries();
        })
        .catch((err) => {
          console.error("Error while updating:", err);
          toast.error("Failed to update enquiry");
        });
    } else {
      // Insert API
      axios.post('http://localhost:8000/api/website/enquiry/insert', formData)
        .then((res) => {
          toast.success('Enquiry Saved Successfully');
          setFormData({ name: '', email: '', phone: '', message: '' });
          getAllEnquiries();
        })
        .catch((err) => {
          console.error("Error while saving:", err);
          toast.error('Failed to save enquiry');
        });
    }
  };

  // ✅ Fetch All Enquiries
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
                <h4 className="card-title fw-bold mb-3">{editMode ? "Update Enquiry" : "Enquiry Form"}</h4>
                <form onSubmit={saveEnquiry}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" required value={formData.name} onChange={handleChange} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" required value={formData.email} onChange={handleChange} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" name="phone" required value={formData.phone} onChange={handleChange} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" name="message" rows="3" required value={formData.message} onChange={handleChange}></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    {editMode ? "Update" : "Submit"}
                  </button>
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
