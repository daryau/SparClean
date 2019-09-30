$(document).ready(function () {
	$(".menu").on("click", "a", function (event) {
		event.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 1500);
	});

	var calc = new Calculator();

	$(document).on('click', '.btn-calculator[data-name]', function (ev) {
		var $el = $(ev.target);

		var name = $el.data('name');
		var value = $el.attr('value') || $el.data('value');
		var intVal = parseInt(value, 10);

		// console.log(name, value);

		switch (name) {
			case 'bedroom': {
				calc.setBedRoom(intVal);
				break;
			}
			case 'bathroom': {
				calc.setBathRoom(intVal);
				break;
			}
			case 'condition': {
				calc.setCondition(value);
				break;
			}
			case 'clean-type': {
				calc.setCleanType(value);
				break;
			}
		}

		// change active class
		$('.btn-calculator[data-name="' + name + '"]').removeClass('active');
		$el.addClass('active');

		// update price & time
		var estimate = calc.estimate();
		var hours = estimate.time / 60;

		// hours = Math.round(hours);
		// estimate.price = Math.round(estimate.price);

    estimate.price = estimate.price.toFixed(2);
    hours = hours.toFixed(2);

		$('.price').text('$' + estimate.price);
		$('.hours').text(hours + (hours <= 1 ? ' hour' : ' hours'));
	});

	// init calculator
	$('.btn-calculator[data-name].active').click();

	$("#calculator").on("submit", function (event) {
		event.preventDefault();
		console.log('book');
	});

	$(document).ready(function () {
		var button = $('#button-up');
		$(window).scroll(function () {
			if ($(this).scrollTop() > 300) {
				button.fadeIn();
			} else {
				button.fadeOut();
			}
		});
		button.on('click', function () {
			$('body, html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});


	$(function () {
		// Owl Carousel
		var owl = $(".owl-carousel");
		owl.owlCarousel({
			autoplay: true,
			dots: true,
			autoplayTimeout: 3000,
			items: 3,
			margin: 15,
			loop: true,
			lazyLoad: true,
			responsive: {
				0: {
					items: 1
				},
				768: {
					items: 2
				},
				1180: {
					items: 3
				}
			}
		});
	});
});

function Calculator() {
	var _this = {
		bedroom: 1,
		bathroom: 1,
		condition: 'slight', // slight | moderate | heavy
		cleanType: 'recurring', // recurring | one-off | end-of-lease
	};

	function getTimePerBedroom() {
		var times = {
			'recurring': 20,
			'one-off': 45,
			'end-of-lease': 70,
		};

		return times[_this.cleanType];
	}

	function getTimePerBathroom() {
		var times = {
			'recurring': 40,
			'one-off': 85,
			'end-of-lease': 130,
		};

		return times[_this.cleanType];
	}

	function getCondition() {
		var conditions = {
			slight: 75,
			moderate: 100,
			heavy: 155
		};

		return conditions[_this.condition]
	}

	function getPrice() {
		var times = {
			'recurring': 33,
			'one-off': 40,
			'end-of-lease': 40,
		};

		return times[_this.cleanType]
	}

	return {
		setBedRoom(amount) {
			_this.bedroom = parseInt(amount, 10) || 1;
		},
		setBathRoom(amount) {
			_this.bathroom = parseInt(amount, 10) || 1;
		},
		setCondition(condition) {
			_this.condition = condition;
		},
		setCleanType(type) {
			_this.cleanType = type;
		},
		estimate() {
			// get data
			var timePerRoom = getTimePerBedroom();
			var timePerBath = getTimePerBathroom();
			var condition = getCondition();
			var price = getPrice();


			var totalTime = ((_this.bedroom * timePerRoom) * condition / 100) + ((_this.bathroom * timePerBath) * condition / 100);
			var totalPrice = totalTime / 60 * price;

			return {
				price: totalPrice,
				time: totalTime
			}
		}
	};
}
