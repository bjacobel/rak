declare module '@mapbox/cloudfriend' {
  /**
   * [The intrinsic function Ref](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-ref.html)
   * returns the value of the specified parameter or resource.
   *
   * @static
   * @memberof cloudfriend
   * @name ref
   * @param {string} name - The logical name of the resource or parameter you want
   * to dereference.
   * @returns The physical ID of the resource or the value of the parameter.
   */
  export function ref(name: string): {
    Ref: string;
  };

  /**
   * [The intrinsic function Fn::Join](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-join.html)
   * appends a set of values into a single value, separated by the specified
   * delimiter. If a delimiter is the empty string, the set of values are
   * concatenated with no delimiter.
   *
   * @static
   * @memberof cloudfriend
   * @name join
   * @param {string} [delimiter=''] The value you want to occur between fragments.
   * @param {array} pieces - The list of values you want combined.
   * The delimiter will occur between fragments only. It will not terminate the
   * final value.
   * @returns The combined string.
   */
  export function join(pieces: unknown[]): {
    'Fn::Join': (string | unknown[])[];
  };
  export function join(
    delimiter: string,
    pieces: unknown[],
  ): {
    'Fn::Join': (string | unknown[])[];
  };
  /**
   * [The intrinsic function Fn::GetAtt](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-getatt.html)
   * returns the value of an attribute from a resource in the template.
   *
   * @static
   * @memberof cloudfriend
   * @name getAtt
   * @param {string} obj - The logical name of the resource that contains the
   * attribute you want.
   * @param {string} key - The name of the resource-specific attribute whose value
   * you want. See the resource's reference page for details about the attributes
   * available for that resource type.
   * @returns The attribute value.
   */
  export function getAtt(
    obj: string,
    key: string,
  ): {
    'Fn::GetAtt': string[];
  };
  /**
   * [The condition Fn::Equals](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-conditions.html#d0e121788)
   * compares if two values are equal. Returns true if the two values are equal or
   * false if they aren't.
   *
   * @static
   * @memberof cloudfriend
   * @name equals
   * @param {unknown} a - A value of any type that you want to compare.
   * @param {unknown} b - A value of any type that you want to compare.
   * @returns true if the two values are equal or false if they aren't
   */
  export function equals(
    a: unknown,
    b: unknown,
  ): {
    'Fn::Equals': unknown[];
  };
  /**
   * [The intrinsic function Sub](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html)
   * substitutes variables in an input string with values that you specify. In
   * your templates, you can use this function to construct commands or outputs
   * that include values that aren't available until you create or update a stack.
   *
   * @static
   * @memberof cloudfriend
   * @name sub
   * @param {string} str - A string with variables that AWS CloudFormation
   * substitutes with their associated values at runtime. Write variables as
   * ${MyVarName}. Variables can be template parameter names, resource logical
   * IDs, resource attributes, or a variable in a key-value map. If you specify
   * only template parameter names, resource logical IDs, and resource attributes,
   * don't specify a key-value map.
   * If you specify template parameter names or resource logical IDs, such as
   * ${InstanceTypeParameter}, AWS CloudFormation returns the same values as if
   * you used the Ref intrinsic function. If you specify resource attributes,
   * such as ${MyInstance.PublicIp}, AWS CloudFormation returns the same values
   * as if you used the Fn::GetAtt intrinsic function.
   * To write a dollar sign and curly braces (${}) literally, add an exclamation
   * point (!) after the open curly brace, such as ${!Literal}. AWS CloudFormation
   * resolves this text as ${Literal}.
   * @param {object} [variables] - An object where each key is the name of a
   * variable that you included in the String parameter, and each value is the
   * value that AWS CloudFormation substitutes for the associated variable name
   * at runtime.
   * @returns
   */
  export function sub(
    str: string,
    variables?: object,
  ):
    | {
        'Fn::Sub': string;
      }
    | {
        'Fn::Sub': unknown[];
      };

  export function region(): {
    Ref: 'AWS:Region';
  };
}
