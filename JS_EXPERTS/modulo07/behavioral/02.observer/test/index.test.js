import { expect, describe, test, jest, beforeAll } from '@jest/globals'
import PaymentSubject from '../src/subjects/paymentSubjects.js'
import Payment from '../src/events/payments.js'
import Marketing from '../src/observers/marketing.js'
import Shipment from '../src/observers/shipment.js'

describe('Test Suit for Observer Pattern', () => {

  beforeAll(() => {
    jest.spyOn(console, console.log.name).mockImplementation(() => { })
  })

  test('#PaymentSubject notify observers', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }

    const data = 'hello world'
    const expected = data

    subject.subscribe(observer)
    subject.notify(data)
    expect(observer.update).toBeCalledWith(expected)
  })

  test('#PaymentSubject should not notify unsubscribe observers', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }

    const data = 'hello world'

    subject.subscribe(observer)
    subject.unsubscribe(observer)
    subject.notify(data)

    expect(observer.update).not.toHaveBeenCalled()
  })

  test('#Payment should notify subject after a credit card transaction', () => {
    const subject = new PaymentSubject()
    const payment = new Payment(subject)

    const paymentSubjectNotifiesSpy = jest.spyOn(payment.paymentSubject, payment.paymentSubject.notify.name)

    const data = { userName: 'erickwendel', id: Date.now() }
    payment.creditCard(data)

    expect(paymentSubjectNotifiesSpy).toBeCalledWith(data)
  })

  test('#All should notify subscribes after a credit card payment', () => {
    const subject = new PaymentSubject()
    const shipment = new Shipment()
    const marketing = new Marketing()

    const shipmentSpy = jest.spyOn(shipment, shipment.update.name)
    const marketingSpy = jest.spyOn(marketing, marketing.update.name)

    subject.subscribe(shipment)
    subject.subscribe(marketing)

    const payment = new Payment(subject)
    const data = { userName: 'erickwendel', id: Date.now() }

    payment.creditCard(data)

    expect(shipmentSpy).toBeCalledWith(data)
    expect(marketingSpy).toBeCalledWith(data)


  })

})
