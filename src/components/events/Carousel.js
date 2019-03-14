import React from 'react'
import Carousel from 'nuka-carousel'

// 1200 × 600
class Carousels extends React.Component {

  render() {
    return (
      <Carousel
        autoplay={true}
        wrapAround={true}
        withoutControls={true}
        heightMode={'first'}>
        <img src="/assets/images/Events4.jpg" />
        <img src="/assets/images/sing.jpg" />
        <img src="/assets/images/tun.jpg" />
      </Carousel>
    )
  }
}


export default Carousels
