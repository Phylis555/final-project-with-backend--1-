import React, { useEffect, useState } from 'react'
import { getFundByOrganizationAndStatus } from '../../../api/fund.api';
import NoItems from '../../common/noItems/noItems';
import ViewFundsCard from './ViewFundsCard';

export default function PendingFunds(props) {
  // State variables to manage pending funds and filtered funds for display
  const [showingFunds, setShowingFunds] = useState([]);
  const [pendingFunds, setPendingFunds] = useState([])
  const [searchTerm, setsearchTerm] = useState("");

  // Fetch pending funds when organization ID changes
  useEffect(() => {
    try {
      getFundByOrganizationAndStatus(props.organizationID, "pending")
        .then((res) => {
          setPendingFunds(res.data.funds);
        })
    } catch (error) {
      console.log(error);
    }
  }, [props.organizationID]);

  // Filter funds based on search term
  useEffect(() => {
    setShowingFunds(pendingFunds.filter(fund =>
      fund.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fund.description.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  }, [searchTerm, pendingFunds])
  return (
    <>
     {/* Display message if there are no pending funds */}
      {pendingFunds.length === 0 ? (
        <NoItems message="לא נמצאו בקשות שממתינות לאישור" />
      ) : (
        // Display search input field if there are pending funds
        <div className="row d-flex my-3 me-3">
          <div className="col-lg-4 col-md-6 col-sm-8">
            <div className="input-group input-group-outline bg-white">
              <input
                className="form-control"
                type="text"
                placeholder="חיפוש"
                aria-label="Search"
                onChange={(e) => {
                  setsearchTerm(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      )}
      {/* Display message if no search results are found */}
      { pendingFunds.length > 0 && showingFunds.length === 0 ? (
          <NoItems message="לא נמצאו תוצאות" />
        ) :
         // Display pending funds
          <div className="row d-flex">
            { showingFunds.map(fund =>
                <ViewFundsCard key={fund._id} fund={fund} />
            )}
          </div>
      }
    </>
  )
}
