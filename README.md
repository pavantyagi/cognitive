Cognitive
=========

ML as a Service

It is still in development. If you find any errors, please let us know.


Installation
------------

Install all python packages listed in requirements file. Start your Django server(Optionally using a public ip).  It is advised to user virutalenv to isolate other python environments.

virtualenv env
source env/bin/activate

pip install -r requirements.txt
python manage.py runserver <optional IP:PORT>

Now, UI can be accessed at the specified IP:port. If nothing is specified, UI is started at http://127.0.0.1:8000

Usage
-----

1.  Add CSV input data
      Only file format that is supported from UI is '.csv'.  You can use Titanic dataset csv file in the 'tmp' folder. 
      All column names must be visible after you add input data.  

2. You can apply any operation on the input data. The sequence of execution is determined by the workflow graph displayed on the right pane. Create links between components to show relationship.

      Creating links between components
      --------------------------------------

      a) Select one component to highlight it (green color). Now, click on the second component to create a link between them. Inorder to de-highlight , click on the same component again. 

      b) Click “Run” if you add a new component. This registers the new component and adds it to your saved workflow. Or in other words, you won't see the effect unless you click 'Run' after adding the new component. 

      c) You can select any component and click "Show" to view the transformed data till that stage. If you have added a new component, you have to click 'Run' to save it first and then click 'show' to view changes.


3. Once data is completely clean, apply ML algorithm by choosing the classifier and the target column. You have to specify the split percentage also that specifies the ratio of 'training data size' to 'test data size'.

              
Missing features
----------------

1. In this version, UI doesn't support update and deletion of components. It is not possible to edit the component parameters or workflow graph. If you messed up accidentally, the only solution is to refresh the page and create the workflow again.  'Update' and 'Delete' features will be included in the next version of UI. However, all these features are supported through REST API. You can try them using any rest api client. Each workflow step has a corresponding rest API call.

2.  Validations are missing in UI. UI doesn't report any error even if the user creates a component with wrong parameters.
     eg: Applying mathematical operations on  non numerical columns
         Applying operations on columns that are non-existent. (After applying 'Column selection' to project fewer number of columns, un-selected columns cannot be used in any of the future operations)

 
