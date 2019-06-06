import React from 'react'
import BaseAdminScreen from './base-admin-screen'
import { BaseHeader } from '../components/header/base-header';
import { NotificationHelp } from '../components/header/notification-help'
import { routes } from '../routes';
import { Button } from '../components/common/button';
import { CurrentDateTime } from '../components/common/datetime';
import { BasicInfo } from '../components/dashboard/basic-info';
import { DashboardDatePicker } from '../components/dashboard/dashboard-datepicker';
import { Dropdown } from '../components/common/dropdown';

export class DashboardScreen extends React.Component {
    constructor(props) {
        super(props)

        this.renderHeader = this.renderHeader.bind(this)
        this.renderContent = this.renderContent.bind(this)

        this.renderBasicInfo = this.renderBasicInfo.bind(this)
    }

    renderHeader() {
        return (
            <BaseHeader
                title="Trang chinh"
                rightChild={<NotificationHelp />}
            />
        )
    }

    renderBasicInfo() {
        return (
            <React.Fragment>
                <div className="row justify-content-between my-5 mx-0">
                    <Button label='Cap nhat du lieu' />
                    <div>
                        <div className="h6 font-weight-bold mb-2 text-center">Đăng nhập lần cuối: &nbsp;&nbsp;&nbsp;
                                <span className="h6 font-weight-normal">01-04-19</span></div>
                        <CurrentDateTime />
                    </div>
                </div>
                <div className="row align-items-center mb-5">
                    <BasicInfo className='col-sm-4' label='So phim dang chieu' details='3' />
                    <BasicInfo className='col-sm-4' label='Don hang da ban hom nay' details='100' />
                    <BasicInfo className='col-sm-4' label='So rap dang hoat dong' details='3' />
                </div>


                <div className="row mx-0 my-5 align-items-center">
                    <DashboardDatePicker
                        className='col-lg-8'
                        onChange={(s, e) => console.log(s, e)}
                    />
                    <Dropdown
                        defaultLabel='Tat ca rap'
                        onDefaultClick={() => console.log('all theaters')}
                        choices={[
                            { label: 'Nguyen Van Cu', id: 1 },
                            { label: 'Quang Trung', id: 2 },
                            { label: 'Nguyen Van Qua', id: 3 }
                        ]}
                        onChoiceClick={(c) => console.log(`theater ${c.id}`)}
                    />
                </div>
            </React.Fragment>
        )
    }

    renderContent() {
        return (
            <React.Fragment>
                {this.renderBasicInfo()}
            </React.Fragment>
        )
    }

    render() {
        return (
            <BaseAdminScreen
                pathId={routes.DASHBOARD.id}
                requireLogin={true}
                header={this.renderHeader()}
                content={this.renderContent()}
            />
        )
    }
}