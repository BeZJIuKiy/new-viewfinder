import React from 'react';
import { Header } from '../Header/Header';
import './account.css'
import Button from '@material-ui/core/Button';
import { DevicesTable } from './DataTable/DevicesTable';
import { FleetTable } from './DataTable/FleetTable';


export const Account = (props) => {
    // Get data block
    const account = {
        avatar: props.stateAccount.userData.avatar,
        name: props.stateAccount.userData.name,
        company: props.stateAccount.userData.company,
        phone: props.stateAccount.userData.phone,
        email: props.stateAccount.userData.email,
        status: props.stateAccount.userData.status,
        myFleet: props.stateAccount.myFleet,
        myDevices: props.stateDevices,
    };

    return (
        <div className='account'>
            <div>
                <Header
                    state={props.stateHeader}
                    notification={props.notification}
                    firstRenderPorts={()=>{}}
                />

                <div className='account__container'>
                    <div className='account__body'>
                        <div className='account__item'>
                            <div className='account__item__title'>Profile</div>
                            <div className='account__item__icon'>
                                <img src={account.avatar} alt='' />
                            </div>

                            <div className='account__item__info'>
                                <div className='account__item__info__user'>
                                    <div className='account__item__user_nickname'>Name:</div>
                                    <div className='account__item__company'>Company:</div>
                                    <div className='account__item__phone'>Phone:</div>
                                    <div className='account__item__email'>Email:</div>
                                    <div className='account__item__status'>Status:</div>
                                </div>

                                {/* <div className='account__item__user__data'> */}
                                <div className='account__item__user__data'>
                                    <div className='account__item__user_nickname'>{account.name}</div>
                                    <div className='account__item__company'>{account.company}</div>
                                    <div className='account__item__phone'>{account.phone}</div>
                                    <div className='account__item__email'>{account.email}</div>
                                    <div className='account__item__status'>{account.status}</div>
                                </div>
                            </div>
                        </div>

                        <div className='account__item'>
                            <div className='account__item__title'>Balance</div>
                            <div className='account__balance'>
                                <div className='account__balance__item'>
                                    <div className="account__item__info__user">My wallet:</div>
                                    <div className="account__balance__money">0$</div>
                                </div>

                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => alert("Поехали донатить :)")}
                                >
                                    Deposit money
                            </Button>
                            </div>
                        </div>

                        <div className='account__item'>
                            <div className='account__item__title'>My devices</div>
                            <DevicesTable
                                camData={account.myDevices}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='account__container'>
                <div className='account__footer'>
                    <div className='account__footer__events'>
                        <FleetTable state={account.myFleet} />
                    </div>
                </div>
            </div>
        </div>
    )
}