import React from 'react'
import { connect } from 'react-redux'
import { StaticListContainer } from '../common/list-container'
import { NigamonIcon } from '../common/nigamon-icon'
import { ClickableTableCells, InlineClickableView } from '../common/clickable-view'
import { formatMoney } from '../../libs/money'
import { Button } from '../common/button'
import { loadFoods } from '../../stores/foods/foods.action'
import { RemoteLoader } from '../common/remote-loader';
import { FormInput } from '../common/form'

class OrderFoodList extends React.Component {
    constructor(props) {
        super(props)
        this.renderList = this.renderList.bind(this)
    }

    componentWillMount() {
        this.props.loadAvailableFoods()
    }

    renderList() {
        let header = (
            <tr>
                <td className="text-center">Ma thuc an</td>
                <td>Ten thuc an</td>
                <td className="text-right">Don gia</td>
                <td className="text-center">So luong</td>
                <td className="text-right">Tong cong</td>
            </tr>
        )
        let foods = this.props.foods.data
        return (
            <React.Fragment>
                <StaticListContainer
                    className={this.props.disabled ? 'my-5' : 'mt-4 mb-3'}
                    minHeight={200}
                    title="Thuc an"
                    header={header}
                    items={this.props.items}
                    pageSize={5}
                    renderItem={item => {
                        let food = foods.filter(c => c.id === item.id)[0]
                        return (
                            <tr>
                                <ClickableTableCells onClick={() => this.props.disabled ? null : console.log('info')}>
                                    <div className="text-center">{item.id}</div>
                                    <div>{food.name}</div>
                                    <div className="text-right">{formatMoney(food.price) + ' VND'}</div>
                                    <div className="text-center">{item.quantity}</div>
                                    <div className="text-right">{formatMoney(food.price * item.quantity) + ' VND'}</div>
                                </ClickableTableCells>
                                {this.props.disabled ? null :
                                    <td className="text-right">
                                        <InlineClickableView onClick={() => console.log('configure')}>
                                            <NigamonIcon name='cog' />
                                        </InlineClickableView>
                                        /
                                    <InlineClickableView onClick={() => console.log('remove')}>
                                            <NigamonIcon name='times' />
                                        </InlineClickableView>
                                    </td>}
                            </tr>
                        )
                    }}
                />
                {this.props.disabled ? null :
                    <div className='d-flex justify-content-center mb-5'>
                        <Button active={true}
                            label="Them thuc an"
                            onClick={() => console.log('add food')}
                        />
                    </div>}
            </React.Fragment>
        )
    }

    render() {
        return (
            <RemoteLoader
                isLoading={this.props.foods.isLoading}
                isFailed={this.props.foods.isFailed}
                renderOnSuccess={this.renderList}
                renderOnFailed={() => this.props.foods.error}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        foods: state.foods.foods
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loadAvailableFoods: () => dispatch(loadFoods(0))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderFoodList)