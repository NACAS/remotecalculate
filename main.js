(function () {

	$(document).ready(function() {

		var $result = $(".result"),
				$status = $(".status"),
				$apiHost = $("#apiHost"),
				$number1 = $("#inputNumber1"),
				$number2 = $("#inputNumber2");

		$(document.body).on("click", "#calculate", function() {

			if (!$apiHost.val() || !$.isNumeric($number1.val()) || !$.isNumeric($number2.val())) {
				console.error("Missing input values...");
				$status.text("Missing input...");

				return;
			}

			var json = {
				number1: parseFloat($number1.val()),
				number2: parseFloat($number2.val())
			};

			console.log("Calculating... %o", json);
			$status.text("Calculating...");

			$.ajax("https://" + $apiHost.val() + "/calculate", {
				type: "POST",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				data: JSON.stringify(json)
			})
			.done(function (data, textStatus, jqXhr) {
				if (data && data.result) {
					$result.text(data.result);
					$status.text("Success...");
				}
				else {
					$status.text("Result not found in response...");
				}
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				console.error(textStatus);
				$status.text("Error...");
			});

		});

	});

})();
