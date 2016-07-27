import React from 'react';

export default React.createClass({

  blackOrWhite: function(color) {
    const red = parseInt(color.slice(0,2),16)
    const green = parseInt(color.slice(2,4), 16)
    const blue = parseInt(color.slice(4,6), 16)

    let brightness = (red * 299) + (green * 587) + (blue * 114);
    brightness = brightness / 255000;

    // brightness > than 0.5 should be bright enough for black text
    if (brightness >= 0.5) {
      return 'black';
    } else {
      return 'white';
    }
  },

  render: function(){

    if (!this.props.labels){
      return null
    } else {
      return (
        <ul className='label-list group'>
          {this.props.labels.map((label, i) => {
            return (
              <li
                key={i}
                style={{
                  backgroundColor: `#${label.color}`,
                  color: this.blackOrWhite(label.color)
                }}>
                {label.name}
              </li>
            )
          })}
        </ul>
       )
     }
   }
})
