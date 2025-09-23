import csv
import uuid

# Define the number of rows and columns
NUM_ROWS = 38  # Fixed to 38 rows as per your requirement
NUM_COLUMNS = 38  # Fixed to 38 columns as per your requirement

# Generate the CSV file
def generate_csv_with_uuids(filename="output.csv", rows=NUM_ROWS, columns=NUM_COLUMNS):
    # Open the file in write mode
    with open(filename, mode='w', newline='') as file:
        writer = csv.writer(file)
        
        # Create the header row with column names
        header = [f"Column_{i+1}" for i in range(columns)]
        writer.writerow(header)
        
        # Generate rows with unique UUIDs
        for _ in range(rows):
            row_data = [str(uuid.uuid4()) for _ in range(columns)]
            writer.writerow(row_data)

    print(f"CSV file '{filename}' with {rows} rows and {columns} columns has been created.")

# Call the function to generate the CSV
generate_csv_with_uuids()