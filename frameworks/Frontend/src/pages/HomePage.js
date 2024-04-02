import React from 'react';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Img1 from "./image-1.jpg"
import Img2 from "./image-2.jpg"
import Img3 from "./image-3.jpg"
import Img4 from "./image-4.jpg"
// import Img5 from "./image-5.jpg"
import "../App.css"
import { useState, useEffect } from 'react';

import { getFundByStatus } from '../api/fund.api';
// import NoItems from '../components/common/noItems/noItems';
import ViewFundsCard from '../components/fund/viewFunds/ViewFundsCard';

import DonationHomeCard from '../components/donator/HomePage/donationHomeCard';
import { getAllDonations } from '../api/donator.api';
import { Link } from 'react-router-dom';

export default function HomePage() {

    const [mostUrgentFunds, setMostUrgentFunds] = useState([]);
    const [mostUrgentDonations, setMostUrgentDonations] = useState([]);
    const [loading, setLoading] = useState(false);

   useEffect(() => {
        fetchMostUrgentFunds();
        fetchMostUrgentDonations();
    }, []);

    const fetchMostUrgentFunds = async () => {
        try {
            const res = await getFundByStatus('approved');
            const funds = res.data.funds;
            funds.sort((a, b) => new Date(a.endingDate) - new Date(b.endingDate));
            setMostUrgentFunds(funds.slice(0, 2));
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMostUrgentDonations = async () => {
        try {
            setLoading(true);
            const res = await getAllDonations();
            const donations = res.data;
            donations.sort((a, b) => new Date(a.donationEndDate) - new Date(b.donationEndDate));
            setMostUrgentDonations(donations.slice(0, 3));
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };


  return (
    <div >
        <nav>
            <NavBar />
        </nav>

        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner" dir="rtl">
            <div class="carousel-item active">
            <img src={Img1} class="img-1 d-block w-100 hd-image" alt="..." />
            <div class="carousel-caption d-none d-md-block">
                <h1 className='welcome-image-heading'>יש לך ציוד עודף שאינך משתמש בו</h1>
                <h4 className='text-muted'>תרום אותו למי שזקוק לו</h4>
            </div>
            </div>
            <div class="carousel-item">
            <img src={Img2} class="d-block w-100 hd-image" alt="..." />
            <div class="carousel-caption d-none d-md-block">
                <h1 className='welcome-image-heading'>הצטרף אלינו למסע של הערכה </h1>
                <h4 className='text-muted'>תרום ותן להם להרגיש קצת יותר בבית</h4>
            </div>
            </div>
            <div class="carousel-item">
            <img src={Img3} class="d-block w-100 hd-image" alt="..." />
            <div class="carousel-caption d-none d-md-block">
                <h1 className='welcome-image-heading'>הצטרף אלינו למסע של נתינה </h1> 
                <h4 className='text-muted'> יחד נוכל לעשות הבדל גדול </h4>
            </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        </div>

        <div className="container mt-5" dir="rtl">
            <h3 className="d-flex justify-content-center mb-4"> תרומות ציוד דחופות ביותר</h3>
            <div className="row d-flex justify-content-center">
                {loading ? (
                    <>{""}</>
                ) : (
                    <>
                        {mostUrgentDonations.map(donation => (
                            <div className="col-3h">
                                <Link to={`/donator/view/${donation._id}`}>
                                    <DonationHomeCard key={donation._id} donation={donation} />
                                </Link>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
        {/* Display most urgent funds */}
        <div className="container mt-5" dir="rtl">
            <h3 className="d-flex justify-content-center mb-4"> גיוסי כספים דחופים ביותר</h3>
            {
                mostUrgentFunds.length === 0 ? (
                    <>{""}</>
                ) : (
                    <div className="row d-flex">
                        {
                            mostUrgentFunds.map(fund => (
                                <ViewFundsCard key={fund._id} fund={fund} />
                            ))
                        }
                    </div>
                )
            }
        </div>



        <div className='container mt-5' dir="rtl">
            <h3 className='d-flex justify-content-center mb-4'>אודות</h3>

            <div className='row mb-5'>
                <div className='col-5'>
                    <img className="img-about" src={Img4} />
                </div>

                <div className='col-7'>
                    <h5> <p>בעקבות מלחמת חרבות ברזל התגלה צורך גדול בציוד לחיילים ומפונים, אם זה ציוד טקטי או ציוד בסיסי למגורים. </p>
                       <p> במהלך המלחמה, בקשות רבות הועלו ברשתות חברתיות, אך הפלטפורמות לא היו פתרון מוצלח לבעיה. </p>
                        <p>מטרת הפרויקט היא לפתח מערכת המאגדת את כל הבקשות לציוד, בה היה ניתן להוסיף בקשות לציוד בקלות ומאפשרת למבקשים ולתורמים לאתר בקשות רלוונטיות בקלות.
                            בנוסף, המערכת מאפשרת לתרום כסף וכך גם מי שאין לו ציוד לתורמה בבית יוכל לעזור.  </p>
                    </h5>
                </div>

            </div>


        </div>
       
        <footer>
            <Footer />
        </footer>
    </div>
  )
}
