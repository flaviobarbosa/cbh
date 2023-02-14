# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Assumptions:

1. An Agent can work in more than one Facility. 
2. The Agent should be registred in a Facility before booking a Shift.
3. Shift table has the Facility id it was created for.
4. There is a table, let's say, SHIFT_AGENTS, that keeps the information about the agents booked for a shift.
  
  #### Breakdown 1:

  - Acceptance criteria: the table for the Facility x Agent relation should have a custom id column

  - Tasks:

    1. Update the Facility x Agent relation table, let's say FACILITIES_AGENTS, to include the custom id (Based on Assumption #1 there should be a table for the Facility x Agent relation).
    
        FACILITIES_AGENTS(facility_id*, agent_id*, **agent_custom_id**)

          *primary key


- Effort: low (1 hour)

      
#### Breakdown 2:

- Acceptance criteria: the api should allow the custom id parameter

- Tasks:

  1. Update the test for the scenarium
  2. Update the endpoint that receives the request to assign an Agent to a Facility (based on Assumption #2) in order to receive the custom id and then send it to the service.
    
    ``` 
        POST .../facility/{facilityId}/agent 
        {
          agent_id: 1,
          custom_id: <custom_id>
        }
    ``` 

  3. Update the service that persists the association in order receive the custom id as parameter and to save it.

- Effort: low (2 hours)

#### Breakdown 3:

- Acceptance criteria: function getShiftsByFacility should use the custom id on the Agent's metadata.

- Tasks:

  1. Update the test for the scenarium
  2. Update getShiftsByFacility function to populate the Agent's metadata using the custom id from table FACILITY_AGENTS.

- Effort: low (2 hours)

#### Breakdown 4:

- Acceptance criteria: function generateReport should use the custom id on the Agent's metadata.
  
- Tasks:
  
  1. Update the test for the scenarium
  2. Update the function generateReport so when assembling the information for each Shift on the list it will use the custom id

- Effort: low (2 hours)
