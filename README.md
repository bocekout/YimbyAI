# YimbyAI

YimbyAI is a tool designed to analyze parcel data from Regrid and estimate the feasibility and cost of various development options, including:

- Accessory Dwelling Units (ADUs)
- Detached Accessory Dwelling Units (DADUs)
- Duplex/Attached Accessory Dwelling Units (AADUs)
- Full redevelopment projects

## Features

- **Parcel Data Analysis**: Leverages Regrid's parcel data to provide detailed insights.
- **Feasibility Estimation**: Evaluates the potential for ADU, DADU, AADU, or full redevelopment on a given parcel.
- **Cost Estimation**: Provides cost projections for the proposed development options.

## Getting Started

### Prerequisites

- A modern web browser.
- Access to Regrid's parcel data API.
- Python 3.8 or higher installed on your system.

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   ```
2. Set up a virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
3. Install dependencies (if any):
   ```bash
   pip install -r requirements.txt
   ```
4. Open `index.html` in your browser to launch the application.

## File Structure

- `index.html`: The main HTML file for the application.
- `script.js`: Contains the JavaScript logic for data processing and UI interactions.
- `style.css`: Defines the styling for the application.
- `app/`: Contains the Python application code.
  - `__init__.py`: Marks the directory as a Python package.
  - `main.py`: Entry point for the Python application.
  - `utils/`: Contains utility modules.
    - `__init__.py`: Marks the directory as a Python package.
    - `helpers.py`: Utility functions.
- `.venv/`: Virtual environment directory.

## Usage

1. Input parcel data from Regrid.
2. Select the type of development to analyze (ADU, DADU, AADU, or full redevelopment).
3. View feasibility and cost estimates.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- [Regrid](https://regrid.com/) for providing parcel data.