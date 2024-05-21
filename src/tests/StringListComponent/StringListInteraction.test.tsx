import { render, screen, fireEvent } from "@testing-library/react";
import renderer from 'react-test-renderer';
import { StringListComponent } from "../../components/CallCenterComponents";


describe("String list component interaction testing", () => {
  let stringArray: string[];
  let buttons: any[];
  const onChange = (values: string[]) => {
    stringArray = values;
  }; 

  beforeEach(() => {
    stringArray = ["123", "test"]; 
    render(<StringListComponent onChange={onChange} values={stringArray} />);
    buttons = screen.getAllByRole("button");
  }); 

  test("Add a new item in the string list", () => {
    //interaction
    fireEvent.click(buttons[2]);
    //result
    expect(stringArray).toEqual(["123", "test", ""]);
  });

  test("Remove last item in the string list", () => {
    //interaction
    fireEvent.click(buttons[1]);
    //result
    expect(stringArray).toEqual(["123"]);
  });

  test("Remove first item in the string list", () => {
    //interaction
    fireEvent.click(buttons[0]);
    //result
    expect(stringArray).toEqual(["test"]);
  });

  test("Change first string in the list", () => {
    //state
    const firstInput = screen.getAllByRole('textbox')[0]

    //interaction (set value to 'newValue')
    fireEvent.change(firstInput, {target: {value: 'newValue'}})

    //result
    expect(stringArray).toEqual(["newValue", "test"])
  })



  //Snapshot testing
  it('StringListComponent snapshot test', () => {

    const values = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']
  
      const tree = renderer
        .create(<StringListComponent onChange={(v) => {}} values={values} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });


});
