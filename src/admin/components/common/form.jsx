import React from 'react'
import { DatePicker } from './datepicker'
import { formatDate } from '../../libs/datetime'
import { SearchBox } from '../header/search-box';

export class DataForm extends React.Component {
    constructor(props) {
        super(props)


        this.ref = React.createRef()
    }

    render() {
        return (
            <form ref={ref => this.ref = ref}>

            </form>
        )
    }
}

export class FormInput extends React.Component {
    render() {
        console.log(this.props.value)
        return (
            <div className="form-group row align-items-center">
                <label className="col-md-4 control-label font-weight-bold">{this.props.label}</label>
                <div className="col-md-8 position-relative input-group">
                    <input
                        name={this.props.name}
                        type="text" placeholder={this.props.placeholder || ''}
                        className="form-control input-md rounded-0"
                        readOnly={this.props.disabled}
                        defaultValue={this.props.value}
                        onChange={(e) => {
                            e.preventDefault()
                            this.props.onChange(e.target.value)
                        }}
                    />
                </div>
            </div>
        )
    }
}

export class FormSelect extends React.Component {
    render() {
        return (
            <div className="form-group row align-items-center">
                <label className="col-md-4 control-label font-weight-bold">{this.props.label}</label>
                <div className="col-md-8">
                    <select
                        className="form-control rounded-0 pl-2"
                        disabled={this.props.disabled}
                        defaultValue={this.props.value}
                    >
                        {this.props.options.map(opt => {
                            return (
                                <option
                                    key={opt.id}
                                    value={opt.id}
                                    onSelect={(e) => this.props.onChange(e.target.value)}
                                >
                                    {opt.label}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
        )
    }
}

export class FormDatePicker extends React.Component {
    render() {
        return (
            <div className="form-group row align-items-center">
                <label className="col-md-4 control-label font-weight-bold">{this.props.label}</label>
                <div className="col-md-8 position-relative input-group">
                    {this.props.disabled ?
                        <input
                            type="text"
                            className="form-control input-md rounded-0"
                            readOnly={true}
                            value={formatDate(this.props.value)}
                        />
                        :
                        <DatePicker
                            min={this.props.min}
                            max={this.props.max}
                            value={this.props.value}
                            width={this.props.width}
                            onChange={this.props.onChange}
                        />
                    }
                </div>
            </div>
        )
    }
}