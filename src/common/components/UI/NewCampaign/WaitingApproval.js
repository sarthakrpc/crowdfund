import styles from "../../../../styles/fundCampaignIndex.module.css";
import stylesApproval from "../../../../styles/waitingApproval.module.css";
import Image from "next/image";
import { Spinner } from "react-bootstrap";

const WaitingApproval = ({
  networkValidating,
  serverValidating,
  verified,
  stringConfirmation,
  error,
}) => {
  const classesImg =
    "d-flex justify-content-center align-items-center p-2 rounded-circle my-1 position-relative";
  return (
    <>
      <div
        className={`${styles.widthControlClass} ${styles.formCtrlOverride} border-0 `}
      >
        <div className="d-flex flex-column justify-content-center align-items-center m-4 w-100">
          <div className="d-flex flex-row align-items-center">
            <div className={`btn btn-danger ${stylesApproval.svgButton}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-exclamation-triangle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </div>
            <div>
              <h6 className="text-danger m-0">
                Please don't close this tab until all steps are complete
              </h6>
            </div>
          </div>

          <div className="d-flex flex-row justify-content-evenly align-items-center w-100 m-4">
            <div className="d-flex flex-column align-items-center">
              <div className={`${networkValidating ? "opacity-50" : ""}`}>
                <div className={`${classesImg} `}>
                  <Image src={"/metamask-logo.png"} width={50} height={50} />
                  {networkValidating && !error ? (
                    <>
                      <Spinner
                        animation="border"
                        className={`position-absolute ${stylesApproval.spinnerZoom}`}
                      />
                    </>
                  ) : null}
                </div>
                <div className="d-flex justify-content-center">
                  <div className={`${stylesApproval.v1}`}></div>
                </div>
              </div>

              <div
                className={`${
                  serverValidating || networkValidating || error
                    ? "opacity-50"
                    : ""
                }`}
              >
                <div className={`${classesImg}`}>
                  <Image src={"/server-logo.png"} width={50} height={50} />
                  {serverValidating && !error ? (
                    <>
                      <Spinner
                        animation="border"
                        className={`position-absolute ${stylesApproval.spinnerZoom}`}
                      />
                    </>
                  ) : null}
                </div>
                <div className="d-flex justify-content-center">
                  <div className={`${stylesApproval.v1}`}></div>
                </div>
              </div>

              <div>
                <div
                  className={`${
                    !verified ? "opacity-50" : ""
                  } p-2 rounded-circle my-1`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    className="bi bi-cloud-check-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 4.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column ms-5 flex-sm-row align-items-center">
              {!verified && !error ? (
                <Spinner animation="grow" variant="info" className="me-2" />
              ) : error ? (
                <div style={{ width: "55px" }}>
                  <Image src={"/cloud-error.png"} width={50} height={50} />
                </div>
              ) : (
                <div style={{ width: "55px" }}>
                  <img src={"/success.gif"} height="50" />
                </div>
              )}
              <div>
                {" "}
                <h5
                  className={`m-0 ${
                    !error ? "text-success" : "text-danger"
                  } text-align-center`}
                >
                  {stringConfirmation}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitingApproval;
