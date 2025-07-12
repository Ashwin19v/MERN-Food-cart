import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiCreditCard, FiLock, FiTruck, FiCheckCircle } from "react-icons/fi";
import { FaPaypal, FaApplePay, FaGooglePay } from "react-icons/fa";
import { useStore } from "../context/store";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, user, createOrder, isLoading } = useStore();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [orderComplete, setOrderComplete] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
    setValue,
  } = useForm();

  // Pre-fill form with user data
  useEffect(() => {
    if (user) {
      setValue("firstName", user.name?.split(" ")[0] || "");
      setValue("lastName", user.name?.split(" ")[1] || "");
      setValue("address1", user.address || "");
      setValue("phone", user.phone || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const shippingAddress = `${data.address1}, ${
        data.address2 ? data.address2 + ", " : ""
      }${data.city}, ${data.postalCode}, ${data.country}`;

      const orderData = {
        items: cartItems,
        shippingAddress,
        paymentMethod,
        totalAmount: calculateTotal(),
        customerInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: user?.email,
        },
      };

      const response = await createOrder(orderData);
      // setOrderId(
      //   response.orderId || `ORD-${Math.floor(Math.random() * 1000000)}`
      // );
      setOrderComplete(true);
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "India",
    "Japan",
  ];

  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );

  const years = Array.from({ length: 10 }, (_, i) =>
    (new Date().getFullYear() + i).toString().slice(-2)
  );

  // Calculate totals
  const subtotal = cartTotal;
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const calculateTotal = () => total;

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="max-w-md bg-white rounded-3xl shadow-lg p-10 text-center">
          <div className="flex justify-center mb-6">
            <FiCheckCircle className="text-green-500 text-6xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Order Confirmed!
          </h2>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully. We've sent a confirmation
            email with your order details.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="font-medium">
              Order #: <span className="text-blue-600">{orderId}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Estimated delivery:{" "}
              {new Date(
                Date.now() + 5 * 24 * 60 * 60 * 1000
              ).toLocaleDateString()}
            </p>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-blue-600 text-white rounded-xl py-3 font-medium hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="w-full bg-gray-100 text-gray-700 rounded-xl py-3 font-medium hover:bg-gray-200 transition-colors"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center space-x-4 md:space-x-8">
            {[1, 2].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div
                  className={`flex items-center cursor-pointer ${
                    step >= stepNumber ? "text-blue-600" : "text-gray-400"
                  }`}
                  onClick={() => setStep(stepNumber)}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= stepNumber
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {stepNumber}
                  </div>
                  <span className="ml-2 hidden sm:inline">
                    {stepNumber === 1 ? "Shipping" : "Payment"}
                  </span>
                </div>
                {stepNumber < 2 && (
                  <div
                    className={`h-0.5 w-8 md:w-12 ${
                      step > stepNumber ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column: Form */}
          <div className="md:col-span-2 bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-8 border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {step === 1 ? "Shipping Information" : "Payment Details"}
            </h2>

            {step === 1 ? (
              <form
                onSubmit={handleSubmit(() => setStep(2))}
                className="space-y-6"
              >
                <div className="space-y-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-700 flex items-center">
                    <FiTruck className="mr-2" /> Shipping Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <input
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-200"
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none`}
                        placeholder="First Name"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.lastName ? "border-red-500" : "border-gray-200"
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none`}
                        placeholder="Last Name"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-2">
                      <input
                        {...register("address1", {
                          required: "Address is required",
                        })}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.address1 ? "border-red-500" : "border-gray-200"
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none`}
                        placeholder="Address Line 1"
                      />
                      {errors.address1 && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address1.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-2">
                      <input
                        {...register("address2")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                        placeholder="Address Line 2 (Optional)"
                      />
                    </div>
                    <div>
                      <input
                        {...register("city", { required: "City is required" })}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.city ? "border-red-500" : "border-gray-200"
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none`}
                        placeholder="City"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("postalCode", {
                          required: "Postal code is required",
                        })}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.postalCode
                            ? "border-red-500"
                            : "border-gray-200"
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none`}
                        placeholder="Postal Code"
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.postalCode.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <select
                        {...register("country", {
                          required: "Country is required",
                        })}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.country ? "border-red-500" : "border-gray-200"
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none`}
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9\-\+]{9,15}$/,
                            message: "Invalid phone number",
                          },
                        })}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.phone ? "border-red-500" : "border-gray-200"
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none`}
                        placeholder="Phone Number"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-xl px-6 py-3 font-medium hover:bg-blue-700 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-700 flex items-center">
                    <FiCreditCard className="mr-2" /> Payment Method
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div
                      className={`p-3 border rounded-xl cursor-pointer transition-all flex flex-col items-center ${
                        paymentMethod === "credit-card"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => setPaymentMethod("credit-card")}
                    >
                      <FiCreditCard className="text-2xl mb-1" />
                      <span className="text-sm">Card</span>
                    </div>
                    <div
                      className={`p-3 border rounded-xl cursor-pointer transition-all flex flex-col items-center ${
                        paymentMethod === "paypal"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => setPaymentMethod("paypal")}
                    >
                      <FaPaypal className="text-2xl mb-1 text-blue-700" />
                      <span className="text-sm">PayPal</span>
                    </div>
                    <div
                      className={`p-3 border rounded-xl cursor-pointer transition-all flex flex-col items-center ${
                        paymentMethod === "apple-pay"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => setPaymentMethod("apple-pay")}
                    >
                      <FaApplePay className="text-2xl mb-1" />
                      <span className="text-sm">Apple Pay</span>
                    </div>
                    <div
                      className={`p-3 border rounded-xl cursor-pointer transition-all flex flex-col items-center ${
                        paymentMethod === "google-pay"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => setPaymentMethod("google-pay")}
                    >
                      <FaGooglePay className="text-2xl mb-1" />
                      <span className="text-sm">Google Pay</span>
                    </div>
                  </div>

                  {paymentMethod === "credit-card" && (
                    <>
                      <div>
                        <input
                          {...register("cardName", {
                            required: "Cardholder name is required",
                          })}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.cardName
                              ? "border-red-500"
                              : "border-gray-200"
                          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none`}
                          placeholder="Cardholder Name"
                        />
                        {errors.cardName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.cardName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          {...register("cardNumber", {
                            required: "Card number is required",
                            pattern: {
                              value: /^[0-9\s]{13,19}$/,
                              message: "Invalid card number",
                            },
                          })}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.cardNumber
                              ? "border-red-500"
                              : "border-gray-200"
                          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none`}
                          placeholder="Card Number"
                        />
                        {errors.cardNumber && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.cardNumber.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex gap-2">
                            <select
                              {...register("expiryMonth", {
                                required: "Month is required",
                              })}
                              className={`w-full px-4 py-3 rounded-xl border ${
                                errors.expiryMonth
                                  ? "border-red-500"
                                  : "border-gray-200"
                              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none`}
                            >
                              <option value="">MM</option>
                              {months.map((month) => (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              ))}
                            </select>
                            <select
                              {...register("expiryYear", {
                                required: "Year is required",
                              })}
                              className={`w-full px-4 py-3 rounded-xl border ${
                                errors.expiryYear
                                  ? "border-red-500"
                                  : "border-gray-200"
                              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none`}
                            >
                              <option value="">YY</option>
                              {years.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
                          {(errors.expiryMonth || errors.expiryYear) && (
                            <p className="text-red-500 text-sm mt-1">
                              Expiry date is required
                            </p>
                          )}
                        </div>
                        <div>
                          <input
                            {...register("cvv", {
                              required: "CVV is required",
                              pattern: {
                                value: /^[0-9]{3,4}$/,
                                message: "Invalid CVV",
                              },
                            })}
                            className={`w-full px-4 py-3 rounded-xl border ${
                              errors.cvv ? "border-red-500" : "border-gray-200"
                            } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none`}
                            placeholder="CVV"
                          />
                          {errors.cvv && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.cvv.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="bg-blue-50 p-6 rounded-xl text-center">
                      <FaPaypal className="text-4xl text-blue-700 mx-auto mb-4" />
                      <p className="text-gray-700 mb-4">
                        You'll be redirected to PayPal to complete your payment
                        securely.
                      </p>
                    </div>
                  )}

                  {["apple-pay", "google-pay"].includes(paymentMethod) && (
                    <div className="bg-blue-50 p-6 rounded-xl text-center">
                      {paymentMethod === "apple-pay" ? (
                        <FaApplePay className="text-4xl mx-auto mb-4" />
                      ) : (
                        <FaGooglePay className="text-4xl mx-auto mb-4" />
                      )}
                      <p className="text-gray-700 mb-4">
                        You'll complete your payment using{" "}
                        {paymentMethod.replace("-", " ")}.
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 text-white rounded-xl px-6 py-3 font-medium hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
                  >
                    <FiLock className="mr-2" />
                    {isLoading ? "Processing..." : "Confirm & Pay"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Dynamic Order Summary */}
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-6 border border-gray-100 h-fit sticky top-8">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700">
              Order Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">
                  Subtotal ({cartItems.length} items)
                </span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">
                  Shipping{" "}
                  {subtotal > 50 && (
                    <span className="text-green-600">(Free)</span>
                  )}
                </span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-bold text-blue-600">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Dynamic Cart Items Preview */}
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-3">
                Your Items
              </h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg mr-3 overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.product.name}</p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      ${item.product.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-500 mt-4">
              <FiLock className="mr-2 text-blue-500" />
              <span>Secure SSL encrypted payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
