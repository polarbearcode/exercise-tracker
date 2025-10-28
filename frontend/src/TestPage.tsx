export default function TestPage() {
  return (
    <>
      <div>
        <h1>Exercise Tracker</h1>
      </div>

      <div>
        <h2>Categories</h2>
      </div>

      <div>
        <h3>Stretches</h3>
        <table>
          <tbody>
            <tr>
              <td>Quad Stretch</td>
              <td>
                <button>+1</button>
              </td>
              <td>Cumulative Count: 100</td>
            </tr>

            <tr>
              <td>Hamstring Stretch</td>
              <td>
                <button>+1</button>
              </td>
              <td>Cumulative Count: 100</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3>Mobility Movements</h3>
        <table>
          <tbody>
            <tr>
              <td>Shoulder Circles</td>
              <td>
                <button>+1</button>
              </td>
              <td>Cumulative Count: 100</td>
            </tr>

            <tr>
              <td>Hip Openers</td>
              <td>
                <button>+1</button>
              </td>
              <td>Cumulative Count: 100</td>
            </tr>

            <tr>
              <td>Ankle Circles</td>
              <td>
                <button>+1</button>
              </td>
              <td>Cumulative Count: 100</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3>Core Exercises</h3>
        <table>
          <tbody>
            <tr>
              <td>Planks</td>
              <td>
                <button>+1</button>
              </td>
              <td>Cumulative Count: 100</td>
            </tr>

            <tr>
              <td>Bird Dogs</td>
              <td>
                <button>+1</button>
              </td>
              <td>Cumulative Count: 100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
