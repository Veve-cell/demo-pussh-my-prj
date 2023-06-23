//Đối tượng Validator
function Validator(options) {

    function getParent(element, selector) {
        while (element.parentElement) {
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};
  
    //Hàm thực hiện validate
    function validate(inputElement, rule) {
    
      var errorElement = getParent(inputElement,options.formGroupSelector).querySelector(options.errorSelector);
      
      var errorMessage;
  
      //Lấy ra các rules của selector
      var rules = selectorRules[rule.selector];
  
      //Lặp qua từng rule và ktra
      //Nếu có lỗi thì break
      for (var i = 0; i < rules.length; ++i) {
        switch (inputElement.type) {
            case 'radio':
            case 'checkbox':
                errorMessage = rules[i](
                    formElement.querySelector(rule.selector + ':checked')
                    );
                break;
            default:
                errorMessage = rules[i](inputElement.value);
        }
        
        if (errorMessage) break;
      }
  
      if (errorMessage) {
        errorElement.innerText = errorMessage;
        getParent(inputElement,options.formGroupSelector).classList.add("invalid");
      } else {
        errorElement.innerText = "";
        getParent(inputElement,options.formGroupSelector).classList.remove("invalid");
      }
      return !errorMessage; // trả ra true nếu có lỗi, k lỗi trả về false
    }
  
    //Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
      //Khi submit form
      formElement.addEventListener("submit", function (e) {
        e.preventDefault();
  
        var isFormValid = true;
  
        //Lặp qua từng rule và validate
        options.rules.forEach(function (rule) {
          var inputElements = formElement.querySelectorAll(rule.selector);
          var isValid = validate(inputElement, rule);
          if (!isValid) {
            isFormValid = false;
          }
        });
  
        if (isFormValid) {
            //Trường hợp submit với js
          if (typeof options.onSubmit === "function") {
            var enableInputs = formElement.querySelectorAll(
              '[name]:not([disabled])'
            );
            var formValues = Array.from(enableInputs).reduce(function (values,input) {
                values[input.name] = input.value;
                return values;
            },{});
            options.onSubmit(formValues);
          }
          //Trường hợp submit với hành vi mặc định
          else {
            formElement.submit();
          }
        }
      });
  
      //Lặp qua mỗi rule và xử lý (lắng nge sự kiện blur, input, textarea,...)
      options.rules.forEach(function (rule) {
        //Lưu lại các rules cho mỗi input
        if (Array.isArray(selectorRules[rule.selector])) {
          selectorRules[rule.selector].push(rule.test);
        } else {
          selectorRules[rule.selector] = [rule.test];
        }
  
        var inputElements = formElement.querySelectorAll(rule.selector);
        inputElements.forEach(function (inputElement) {
          // Xử lý trường hợp blur khỏi input
          inputElement.onblur = function () {
            validate(inputElement, rule);
          };
  
          // Xử lý mỗi khi người dùng nhập vào input
          inputElement.oninput = function () {
            var errorElement = getParent(inputElement,options.formGroupSelector).querySelector(
              ".form-message"
            );
            errorElement.innerText = "";
            getParent(inputElement,options.formGroupSelector).classList.remove("invalid");
          };
        });
      });
    }
  }
  
  //Định nghĩa Rules
  // Nguyên tắc của các rules
  // 1. Khi có lỗi thì trả msg lỗi
  //2. Khi hợp lệ thì k trả ra j cả
  Validator.isRequired = function (selector, message) {
    return {
      selector: selector,
      test: function (value) {
        return value ? undefined : message || "Vui lòng nhập trường này";
      },
    };
  };
  
  Validator.isEmail = function (selector, message) {
    return {
      selector: selector,
      test: function (value) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value)
          ? undefined
          : message || "Vui lòng nhập đúng định dạng email";
      },
    };
  };
  
  Validator.minLength = function (selector, min, message) {
    return {
      selector: selector,
      test: function (value) {
        return value.length >= min
          ? undefined
          : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
      },
    };
  };
  
  Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
      selector: selector,
      test: function (value) {
        return value === getConfirmValue() ? undefined : message || "Giá trị nhập vào không chính xác";
      },
    };
  };
  