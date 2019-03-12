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
        <img src="https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/53807485_10158146850192646_4358191452275081216_o.jpg?_nc_cat=100&_nc_ht=scontent-lhr3-1.xx&oh=914ba1a36391dabb4a430c707ef3c115&oe=5D1ECE43" />
        <img src="https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/53402098_10158146850187646_6420397442281242624_o.jpg?_nc_cat=109&_nc_ht=scontent-lhr3-1.xx&oh=2b5d1b6fe830498508029c0c7d4d19d3&oe=5D176415" />
        <img src="https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/53315494_10158146850172646_8841006749352722432_o.jpg?_nc_cat=104&_nc_ht=scontent-lhr3-1.xx&oh=dd1c8fa24379130507425eeab8059c87&oe=5D17DA87" />
      </Carousel>
    )
  }
}


export default Carousels
