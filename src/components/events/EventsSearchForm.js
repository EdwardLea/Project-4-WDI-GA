import React from 'react'

const EventsForm = ({ handleChange }) => {

  return (

    <div className="columns">

      <div className="column is-3 clubFormDiv-1 is-offset-3">
        <div className="field">
          <div className="control">

            <label className="label"> <strong className="has-text-white"> Explore by category </strong> </label>

            <select
              className="select has-text-white"
              name="category"
              onChange={handleChange}
            >
              <option> All </option>
              <option> Board Games </option>
              <option> Food & Drink </option>
              <option> Mums </option>
              <option> Sports </option>
              <option> Photography </option>
              <option> Gaming </option>
            </select>

          </div>
        </div>
      </div>

      <div className="column is-3 clubFormDiv-1">
        <div className="field">
          <div className="control">
            <label className="label"> <strong className="has-text-white"> Search By City </strong> </label>
            <form>
              <input
                name="location"
                type="text"
                placeholder="Location"
                onChange={handleChange} />
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default EventsForm
