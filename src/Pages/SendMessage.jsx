import React, { useState } from "react";
import UserSidebar from "../Components/UserSidebar";
import UserNavbar from "../Components/UserNavbar";
import { SiImessage } from "react-icons/si";
import { SEND_MESSAGE } from "./../utility/api";
import axios from "axios";
import { loadingActions } from "../store/loading";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

function SendMessage({
  mainContentRef,
  sidebarRef,
  handleToggle,
  removeSmRef,
  SmallhandleToggle,
  SmallhandleToggleRemove,
}) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [adminId] = useState("12345"); // Mock admin ID
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async  (event) => {
    event.preventDefault();
    if (!subject || !body) {
      toast.error("Please fill out all required fields.");
      return;
    }
    dispatch(loadingActions.setLoading(true));

    try {
      let response=await axios.post(SEND_MESSAGE, {
        subject: subject,
        body: body,
      })
      if (response.data.success) {
        toast.success(response.data.message);
        setSubject("");
        setBody("");
      } else {
        toast.error(response.data.message);
      }      
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message); 
      } else {
        toast.error("Failed to send message");
      }
    } finally {
      dispatch(loadingActions.setLoading(false));
    }
  };
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
      <main>
        <UserSidebar
          sidebarRef={sidebarRef}
          handleToggle={handleToggle}
          removeSmRef={removeSmRef}
          SmallhandleToggle={SmallhandleToggle}
          SmallhandleToggleRemove={SmallhandleToggleRemove}
        />
        {/* <!-- main_content --> */}
        <div
          id="sm_main_content"
          ref={mainContentRef}
          className="main_content_section p-lg-2"
        >
          <div className="container p-0">
            <UserNavbar
              SmallhandleToggle={SmallhandleToggle}
              SmallhandleToggleRemove={SmallhandleToggleRemove}
            />
          </div>

          {/* Middle Content */}
          <div className="container px-lg-4" style={{ marginBottom: "20px" }}>
            <div className="row cards_sec mt-lg-2">
              <div className="col-lg-12 col_space">
                <div className="card card_design p-3">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-lg-9">
                      <div className="row justify-content-center align-items-center h-100">
                        <div className="col-lg-8 card_gray p-4 mt-lg-5">
                          <p className=" mb-3">
                            <SiImessage style={{ fontSize: "26px" }} />
                          </p>
                          <form onSubmit={handleSubmit} className="message_sec">
                            <h5 className="mb-3">Drop Us a Message</h5>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="mb-3">
                                  <input
                                    type="text"
                                    name="subject"
                                    className="form-control"
                                    placeholder="Your Subject *"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="mb-3">
                                  <textarea
                                    name="body"
                                    className="form-control"
                                    placeholder="Your Message *"
                                    style={{ height: "150px" }}
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    required
                                  />
                                </div>
                              </div>
                              <input
                                type="hidden"
                                name="admin_id"
                                value={adminId}
                              />
                            </div>
                            <div className="d-flex justify-content-center">
                              <div className="mb-3 mt-3">
                                <button
                                  type="submit"
                                  name="btnSubmit"
                                  className="btn btn-new2"
                                >
                                  Send Message
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      {successMessage && (
                        <div className="alert alert-success mt-3">
                          {successMessage}
                        </div>
                      )}
                      {errorMessage && (
                        <div className="alert alert-danger mt-3">
                          {errorMessage}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default SendMessage;
