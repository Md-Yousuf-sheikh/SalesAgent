export let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/;
export function validationCheck(value, type) {
  if (type === "email") {
    if (email.test(value)) {
      return true;
    } else {
      // setValue(null)
      return false;
    }
  } else if (type === "password") {
    if (value?.length > 5) {
      return true;
    } else {
      return false;
      // setValue(null)
    }
  } else if (type === "number") {
    let re = /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/;
    if (re.test(value)) {
      return true;
    } else {
      return false;
      // setValue(null)
    }
  }
}

export function isEmpty(obj) {
  for (var prop in obj) {
    if (obj[prop]) return false;
  }

  return true;
}
