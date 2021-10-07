import React from 'react';

const OrderHistory = () => {
    return (
        <div className="orderHistoryWrapper">
            <div className="orderHistoryHeader">
                <h2>Order history</h2>
            </div>
            <div className="singleOrder">
                <div className="topSide">
                    <h3>
                        NEW YORK STYLE DOUGH
                    </h3>
                    <div>
                        15$
                    </div>
                </div>
                <div className="buttomSide">
                    <div>
                        MozarellaChesdasd,Sidasdas sdasd,scoajsdia,sakodkaspdo
                    </div>
                    <div>
                        10.8.2021 15:15
                    </div>
                </div>
            </div>
            <div className="singleOrder">
                <div className="topSide">
                    <h3>
                        NEW YORK STYLE DOUGH
                    </h3>
                    <div>
                        15$
                    </div>
                </div>
                <div className="buttomSide">
                    <div>
                        MozarellaChesdasd,Sidasdas sdasd,scoajsdia,sakodkaspdo
                    </div>
                    <div>
                        10.8.2021 15:15
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;