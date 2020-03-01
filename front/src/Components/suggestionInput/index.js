import React from 'react'
import axios from 'axios'
import './index.css'

function pp(fun, time) {
    let timeout
    return () => {
        clearTimeout(timeout)
        timeout = setTimeout(fun, time)
    }
}

export default class SuggestInput extends React.Component {
    state = {
        suggestions: [],
        value: "",
        visible: false
    }
    suggest = pp(this.valueChanged.bind(this), 500)
    render() {
        return (
            <>
                <input ref={x => this.x = x} value={this.state.value}
                    placeholder={this.props.placeholder || ''}
                    className={this.props.className || ''}
                    onBlur={() => setTimeout(() => this.setState({ visible: false }), 100)}
                    onFocus={() => this.setState({ visible: true })}
                    onChange={e => {
                        this.setState({ value: e.target.value })
                        this.suggest()
                        if (this.props.onChange) this.props.onChange(e)
                    }} />
                {this.state.value && this.state.suggestions.length != 0 && this.state.visible ?
                    <ul className="si" style={this.foo()}>
                        {this.state.suggestions.map((x, key) => <li
                            key={key}
                            onClick={() => this.setState({ suggestions: [], value: x.name, visible: false })}>
                            {x.name}
                        </li>)}
                    </ul> : null
                }
            </>
        )
    }

    foo = () => {
        const { top, left, height, width } = this.x.getBoundingClientRect()
        return { top: top + height, left, width }
    }

    async valueChanged(e) {
        const { value } = this.state
        const suggestions = await axios(`${this.props.completionUrl}/${value}`).then(res => res.data)
        this.setState({ suggestions, visible: true })

    }

}